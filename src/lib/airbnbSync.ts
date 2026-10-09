import { getDb } from "./db";

export interface SyncResult {
  message: string;
  synced: number;
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
  let synced = 0;
  for (const event of Object.values(events)) {
    if (!event || event.type !== "VEVENT" || !event.start || !event.end) continue;
    await sql`
      INSERT INTO reservations (checkin, checkout, guest_name, guest_email, guest_phone,
        guests_count, total_price, status, source, message)
      VALUES (${event.start}, ${event.end}, 'Airbnb Guest', '', '', 1, 0, 'confirmed', 'airbnb', ${event.summary ?? ""})
      ON CONFLICT DO NOTHING
    `;
    synced++;
  }

  return { message: `Sync Airbnb terminée — ${synced} événement(s) traité(s).`, synced };
}
