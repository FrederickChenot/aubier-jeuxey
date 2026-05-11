export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import DisponibilitesManager from "./DisponibilitesManager";

export default async function AdminDisponibilitesPage() {
  let session;
  try { session = await getServerSession(authOptions); } catch { session = null; }
  if (!session) redirect("/admin/login");

  let blocked: any[] = [];
  try {
    const sql = getDb();
    blocked = await sql`SELECT * FROM blocked_dates ORDER BY date_start DESC`;
  } catch (e) {
    console.error("DB error /admin/disponibilites:", e);
  }

  return <DisponibilitesManager blocked={blocked} />;
}
