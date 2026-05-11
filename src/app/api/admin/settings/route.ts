import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getSettings } from "@/lib/settings";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const sql = getDb();
  const settings = await getSettings(sql);
  return Response.json(settings);
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as Record<string, string>;
  const allowed = ["prix_nuit", "frais_menage", "caution"];
  const sql = getDb();

  for (const [key, value] of Object.entries(body)) {
    if (!allowed.includes(key)) continue;
    if (isNaN(Number(value)) || Number(value) < 0) continue;
    await sql`
      INSERT INTO settings (key, value) VALUES (${key}, ${value})
      ON CONFLICT (key) DO UPDATE SET value = ${value}
    `;
  }

  const settings = await getSettings(sql);
  return Response.json(settings);
}
