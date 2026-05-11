export const dynamic = "force-dynamic";

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

  let settings = { prix_nuit: 75, frais_menage: 40, caution: 300 };
  try {
    const sql = getDb();
    settings = await getSettings(sql);
  } catch (e) {
    console.error("DB error /admin/parametres:", e);
  }

  return <ParametresManager settings={settings} />;
}
