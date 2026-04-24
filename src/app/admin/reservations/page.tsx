import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import BlockedDatesManager from "./BlockedDatesManager";

export default async function AdminReservationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const sql = getDb();
  const blocked = await sql`SELECT * FROM blocked_dates ORDER BY date_start DESC`;

  return <BlockedDatesManager blocked={blocked as any[]} />;
}
