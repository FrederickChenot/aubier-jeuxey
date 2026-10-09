import ical from "ical-generator";
import { getDb } from "./db";
import { BLOCKING_STATUSES } from "./availability";

export async function generateIcal(): Promise<string> {
  const sql = getDb();

  const [reservations, blocked] = await Promise.all([
    sql`
      SELECT checkin, checkout, id
      FROM reservations
      WHERE status = ANY(${BLOCKING_STATUSES})
      ORDER BY checkin
    `,
    sql`
      SELECT date_start, date_end, id
      FROM blocked_dates
      ORDER BY date_start
    `,
  ]);

  const calendar = ical({
    name: "L'Aubier — Réservations",
    timezone: "Europe/Paris",
    prodId: { company: "L'Aubier", product: "Reservations" },
  });

  for (const row of reservations) {
    const ev = calendar.createEvent({
      start: new Date(row.checkin),
      end: new Date(row.checkout),
      summary: "Réservé",
    });
    ev.uid(`reservation-${row.id}@aubier-vosges.fr`);
  }

  for (const row of blocked) {
    const ev = calendar.createEvent({
      start: new Date(row.date_start),
      end: new Date(row.date_end),
      summary: "Indisponible",
    });
    ev.uid(`blocked-${row.id}@aubier-vosges.fr`);
  }

  return calendar.toString();
}
