import ical from "ical-generator";
import { getDb } from "./db";

export async function generateIcal(): Promise<string> {
  const sql = getDb();
  const rows = await sql`
    SELECT checkin, checkout, guest_name, id
    FROM reservations
    WHERE status IN ('confirmed', 'pending')
    ORDER BY checkin
  `;

  const calendar = ical({
    name: "L'Aubier — Réservations",
    timezone: "Europe/Paris",
    prodId: { company: "L'Aubier", product: "Reservations" },
  });

  for (const row of rows) {
    const ev = calendar.createEvent({
      start: new Date(row.checkin),
      end: new Date(row.checkout),
      summary: `Séjour — ${row.guest_name}`,
    });
    ev.uid(`reservation-${row.id}@laubier.fr`);
  }

  return calendar.toString();
}
