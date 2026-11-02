import type { NeonQueryFunction } from "@neondatabase/serverless";
import { getDb } from "./db";

export interface SyncResult {
  message: string;
  synced: number;
  lastSync?: string;
}

const LAST_SYNC_KEY = "airbnb_last_sync";
const LAST_ATTEMPT_KEY = "airbnb_last_attempt";
const FETCH_TIMEOUT_MS = 5_000;
const RETRY_AFTER_FAILURE_MS = 5 * 60 * 1000;

// DATE-only events are parsed by node-ical with new Date(year, month-1, day) —
// des composants locaux, sans décalage — donc les getters locaux (pas UTC) sont fiables ici.
function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function saveTimestamp(sql: NeonQueryFunction<false, false>, key: string, value: string): Promise<void> {
  await sql`
    INSERT INTO settings (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = ${value}
  `;
}

async function importCalendar(sql: NeonQueryFunction<false, false>, url: string): Promise<number> {
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!res.ok) throw new Error(`Calendrier Airbnb indisponible (HTTP ${res.status}).`);

  const text = await res.text();
  // Une page d'erreur ne doit jamais être prise pour un calendrier vide : cela effacerait tous les blocages.
  if (!text.trimStart().startsWith("BEGIN:VCALENDAR")) {
    throw new Error("Réponse Airbnb invalide : ce n'est pas un calendrier iCal.");
  }

  // Selon l'environnement (Node seul ou bundle Next), sync est exposé directement ou via default.
  const mod: any = await import("node-ical");
  const nodeIcal = mod.sync ? mod : mod.default;
  const events: Record<string, any> = nodeIcal.sync.parseICS(text);

  const seenUids: string[] = [];
  let synced = 0;

  for (const event of Object.values(events)) {
    if (!event || event.type !== "VEVENT" || !event.start || !event.end) continue;

    const uid = event.uid;
    // Ignore nos propres réservations réexportées par Airbnb (boucle d'auto-sync).
    if (!uid || uid.endsWith("@aubier-vosges.fr")) continue;

    const dateStart = toDateString(event.start);
    const dateEnd = toDateString(event.end);

    await sql`
      INSERT INTO blocked_dates (date_start, date_end, reason, source, external_uid)
      VALUES (${dateStart}, ${dateEnd}, ${event.summary ?? "Airbnb"}, 'airbnb', ${uid})
      ON CONFLICT (source, external_uid)
      DO UPDATE SET date_start = EXCLUDED.date_start, date_end = EXCLUDED.date_end, reason = EXCLUDED.reason
    `;
    seenUids.push(uid);
    synced++;
  }

  if (seenUids.length > 0) {
    await sql`DELETE FROM blocked_dates WHERE source = 'airbnb' AND NOT (external_uid = ANY(${seenUids}))`;
  } else {
    await sql`DELETE FROM blocked_dates WHERE source = 'airbnb'`;
  }

  return synced;
}

// Sync iCal Airbnb — inactif jusqu'à réception de AIRBNB_ICAL_URL.
export async function syncAirbnb(): Promise<SyncResult> {
  if (!process.env.AIRBNB_ICAL_URL) {
    return { message: "AIRBNB_ICAL_URL non configuré — sync ignorée.", synced: 0 };
  }

  const sql = getDb();
  try {
    const synced = await importCalendar(sql, process.env.AIRBNB_ICAL_URL);
    const lastSync = new Date().toISOString();
    await saveTimestamp(sql, LAST_SYNC_KEY, lastSync);
    return { message: `Sync Airbnb terminée — ${synced} blocage(s) à jour.`, synced, lastSync };
  } catch (err) {
    // L'erreur d'origine reste celle remontée, même si l'heure de la tentative ne peut pas être enregistrée.
    await saveTimestamp(sql, LAST_ATTEMPT_KEY, new Date().toISOString()).catch((saveErr) => {
      console.error("Enregistrement de la tentative de sync Airbnb impossible :", saveErr);
    });
    throw err;
  }
}

function elapsedMs(timestamp: string | undefined, now: number): number {
  const time = timestamp ? Date.parse(timestamp) : NaN;
  return Number.isNaN(time) ? Infinity : now - time;
}

// Synchro à la demande : ne bloque jamais le visiteur sur une erreur, et une panne d'Airbnb
// n'est retentée qu'une fois toutes les 5 min pour ne pas faire attendre chaque requête.
export async function syncAirbnbIfStale(maxAgeMinutes: number): Promise<void> {
  if (!process.env.AIRBNB_ICAL_URL) return;

  try {
    const rows = await getDb()`
      SELECT key, value FROM settings WHERE key IN (${LAST_SYNC_KEY}, ${LAST_ATTEMPT_KEY})
    `;
    const values: Record<string, string> = {};
    for (const r of rows) values[r.key] = r.value;

    const now = Date.now();
    if (elapsedMs(values[LAST_SYNC_KEY], now) < maxAgeMinutes * 60 * 1000) return;
    if (elapsedMs(values[LAST_ATTEMPT_KEY], now) < RETRY_AFTER_FAILURE_MS) return;

    await syncAirbnb();
  } catch (err) {
    console.error("Sync Airbnb à la demande échouée :", err);
  }
}

export async function getLastAirbnbSync(sql: NeonQueryFunction<false, false>): Promise<string | null> {
  const rows = await sql`SELECT value FROM settings WHERE key = ${LAST_SYNC_KEY}`;
  return rows[0]?.value ?? null;
}
