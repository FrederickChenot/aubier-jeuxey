import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const sql = getDb();
  const [reservations, stats] = await Promise.all([
    sql`SELECT * FROM reservations ORDER BY checkin DESC LIMIT 50`,
    sql`
      SELECT
        COUNT(*) FILTER (WHERE status = 'confirmed' AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW())) as this_month_count,
        COALESCE(SUM(total_price) FILTER (WHERE status = 'confirmed' AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW())), 0) as this_month_revenue,
        COUNT(*) FILTER (WHERE status = 'confirmed') as total_confirmed
      FROM reservations
    `,
  ]);

  return (
    <AdminDashboard
      reservations={reservations as any[]}
      stats={stats[0] as any}
    />
  );
}
