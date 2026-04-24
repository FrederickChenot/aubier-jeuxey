import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  if (!checkin || !checkout) {
    return Response.json({ error: "checkin and checkout required" }, { status: 400 });
  }

  try {
    const sql = getDb();

    const conflicts = await sql`
      SELECT COUNT(*) as count FROM reservations
      WHERE status IN ('confirmed', 'pending')
        AND checkin < ${checkout}
        AND checkout > ${checkin}
    `;

    const blockedConflicts = await sql`
      SELECT COUNT(*) as count FROM blocked_dates
      WHERE date_start < ${checkout}
        AND date_end > ${checkin}
    `;

    const total = Number(conflicts[0].count) + Number(blockedConflicts[0].count);

    return Response.json({ available: total === 0 });
  } catch (err) {
    console.error("Availability check error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
