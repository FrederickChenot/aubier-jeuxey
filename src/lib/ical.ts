import ical from "ical-generator";
import { getDb } from "./db";
import { BLOCKING_STATUSES } from "./availability";

export async function generateIcal(): Promise<string> {
  const sql = getDb();

  const [reservations, blocked] = await Promise.all([
    sql`
      SELECT checkin::text, checkout::text, id
      FROM reservations
      WHERE status = ANY(${BLOCKING_STATUSES})
      ORDER BY checkin
    `,
    sql`
      SELECT date_start::text, date_end::text, id
      FROM blocked_dates
      WHERE source != 'airbnb'
      ORDER BY date_start
    `,
  ]);

  const calendar = ical({
    name: "L'Aubier — Réservations",
    prodId: { company: "L'Aubier", product: "Reservations" },
  });

  for (const row of reservations) {
    const ev = calendar.createEvent({
      start: row.checkin,
      end: row.checkout,
      allDay: true,
      summary: "Réservé",
    });
    ev.uid(`reservation-${row.id}@aubier-vosges.fr`);
  }

  for (const row of blocked) {
    const ev = calendar.createEvent({
      start: row.date_start,
      end: row.date_end,
      allDay: true,
      summary: "Indisponible",
    });
    ev.uid(`blocked-${row.id}@aubier-vosges.fr`);
  }

  return calendar.toString();
}
