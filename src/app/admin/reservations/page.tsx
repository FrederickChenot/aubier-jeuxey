import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import ReservationsManager from "./ReservationsManager";

export default async function AdminReservationsPage() {
  let session;
  try { session = await getServerSession(authOptions); } catch { session = null; }
  if (!session) redirect("/admin/login");

  const sql = getDb();
  const reservations = await sql`
    SELECT * FROM reservations ORDER BY checkin DESC
  `;

  return <ReservationsManager reservations={reservations as any[]} />;
}
