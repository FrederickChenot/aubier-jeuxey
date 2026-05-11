import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import ParametresManager from "./ParametresManager";

export default async function AdminParametresPage() {
  let session;
  try { session = await getServerSession(authOptions); } catch { session = null; }
  if (!session) redirect("/admin/login");

  const sql = getDb();
  const settings = await getSettings(sql);

  return <ParametresManager settings={settings} />;
}
