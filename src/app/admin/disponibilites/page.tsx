import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import DisponibilitesManager from "./DisponibilitesManager";

export default async function AdminDisponibilitesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const sql = getDb();
  const blocked = await sql`SELECT * FROM blocked_dates ORDER BY date_start DESC`;

  return <DisponibilitesManager blocked={blocked as any[]} />;
}
