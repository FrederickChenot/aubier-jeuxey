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
    const rows = await sql`
      SELECT
        id,
        guest_name,
        guest_email,
        guest_phone,
        checkin::text,
        checkout::text,
        adults,
        children,
        total_price,
        status,
        notes,
        created_at::text
      FROM reservations
      ORDER BY checkin DESC
    `;
    reservations = rows as any[];
  } catch (e) {
    console.error("DB error /admin/reservations:", e);
  }

  return <ReservationsManager reservations={reservations} />;
}
