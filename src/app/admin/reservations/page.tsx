export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import ReservationsManager from "./ReservationsManager";

export default async function AdminReservationsPage() {
  let session;
  try { session = await getServerSession(authOptions); } catch { session = null; }
  if (!session) redirect("/admin/login");

  let reservations: any[] = [];
  try {
    const sql = getDb();
    reservations = await sql`SELECT * FROM reservations ORDER BY checkin DESC`;
  } catch (e) {
    console.error("DB error /admin/reservations:", e);
  }

  return <ReservationsManager reservations={reservations} />;
}
