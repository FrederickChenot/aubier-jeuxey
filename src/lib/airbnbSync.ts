import { getDb } from "./db";

export interface SyncResult {
  message: string;
  synced: number;
}

// DATE-only events are parsed by node-ical with new Date(year, month-1, day) —
// des composants locaux, sans décalage — donc les getters locaux (pas UTC) sont fiables ici.
function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Sync iCal Airbnb — inactif jusqu'à réception de AIRBNB_ICAL_URL.
export async function syncAirbnb(): Promise<SyncResult> {
  if (!process.env.AIRBNB_ICAL_URL) {
    return { message: "AIRBNB_ICAL_URL non configuré — sync ignorée.", synced: 0 };
  }

  const nodeIcal = await import("node-ical");
  const res = await fetch(process.env.AIRBNB_ICAL_URL);
  const text = await res.text();
  const events = nodeIcal.sync.parseICS(text);

  const sql = getDb();
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

  return { message: `Sync Airbnb terminée — ${synced} blocage(s) à jour.`, synced };
}
