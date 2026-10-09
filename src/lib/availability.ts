import { NeonQueryFunction } from "@neondatabase/serverless";

export const BLOCKING_STATUSES = ["confirmed", "pending"] as const;

export async function getBlockedNights(sql: NeonQueryFunction<false, false>): Promise<string[]> {
  const rows = await sql`
    SELECT generate_series(checkin, checkout - INTERVAL '1 day', INTERVAL '1 day')::date::text AS date
    FROM reservations
    WHERE status = ANY(${BLOCKING_STATUSES})
    UNION
    SELECT generate_series(date_start, date_end - INTERVAL '1 day', INTERVAL '1 day')::date::text AS date
    FROM blocked_dates
  `;
  return rows.map((r) => r.date as string);
}

export async function isRangeAvailable(
  sql: NeonQueryFunction<false, false>,
  checkin: string,
  checkout: string
): Promise<boolean> {
  const [reservationConflict] = await sql`
    SELECT id FROM reservations
    WHERE status = ANY(${BLOCKING_STATUSES})
      AND checkin < ${checkout}::date
      AND checkout > ${checkin}::date
    LIMIT 1
  `;
  if (reservationConflict) return false;

  const [blockConflict] = await sql`
    SELECT id FROM blocked_dates
    WHERE date_start < ${checkout}::date
      AND date_end > ${checkin}::date
    LIMIT 1
  `;
  return !blockConflict;
}
