export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  let session;
  try { session = await getServerSession(authOptions); } catch { session = null; }
  if (!session) redirect("/admin/login");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthStartStr = `${year}-${String(month).padStart(2, "0")}-01`;
  const monthEndStr = `${year}-${String(month).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;

  let statsData = { this_month_count: "0", this_month_revenue: "0" };
  let nextArrival: { checkin: string; guest_name: string } | null = null;
  let occupationRate = 0;

  try {
    const sql = getDb();
    const [stats, nextArrivalRows, monthResRows] = await Promise.all([
      sql`
        SELECT
          COUNT(*) FILTER (WHERE status != 'cancelled'
            AND EXTRACT(MONTH FROM checkin) = ${month}
            AND EXTRACT(YEAR FROM checkin) = ${year}) AS this_month_count,
          COALESCE(SUM(total_price) FILTER (WHERE status = 'confirmed'
            AND EXTRACT(MONTH FROM checkin) = ${month}
            AND EXTRACT(YEAR FROM checkin) = ${year}), 0) AS this_month_revenue
        FROM reservations
      `,
      sql`
        SELECT checkin, guest_name FROM reservations
        WHERE status = 'confirmed' AND checkin >= CURRENT_DATE
        ORDER BY checkin LIMIT 1
      `,
      sql`
        SELECT checkin, checkout FROM reservations
        WHERE status IN ('confirmed', 'pending')
          AND checkout > ${monthStartStr}
          AND checkin <= ${monthEndStr}
      `,
    ]);

    statsData = {
      this_month_count: String(stats[0].this_month_count),
      this_month_revenue: String(stats[0].this_month_revenue),
    };
    nextArrival = nextArrivalRows[0] ?? null;

    const occupiedDays = new Set<string>();
    for (const r of monthResRows) {
      const d = new Date(r.checkin);
      const end = new Date(r.checkout);
      while (d < end) {
        const s = d.toISOString().split("T")[0];
        if (s >= monthStartStr && s <= monthEndStr) occupiedDays.add(s);
        d.setDate(d.getDate() + 1);
      }
    }
    occupationRate = Math.round((occupiedDays.size / daysInMonth) * 100);
  } catch (e) {
    console.error("DB error /admin:", e);
  }

  return (
    <AdminDashboard
      stats={{
        this_month_count: statsData.this_month_count,
        this_month_revenue: statsData.this_month_revenue,
        occupation_rate: occupationRate,
        next_checkin: nextArrival?.checkin ?? null,
        next_guest: nextArrival?.guest_name ?? null,
      }}
    />
  );
}
