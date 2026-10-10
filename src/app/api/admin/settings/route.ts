import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { getSettings, NUMERIC_SETTING_KEYS, TEXT_SETTING_KEYS } from "@/lib/settings";

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

  const body = await request.json() as Record<string, unknown>;
  const numericKeys: readonly string[] = NUMERIC_SETTING_KEYS;
  const textKeys: readonly string[] = TEXT_SETTING_KEYS;
  const sql = getDb();

  for (const [key, rawValue] of Object.entries(body)) {
    let value: string;
    if (numericKeys.includes(key)) {
      // Décimaux acceptés, avec point ou virgule ("0,05" → "0.05").
      value = String(rawValue ?? "").trim().replace(",", ".");
      const n = Number(value);
      if (value === "" || !Number.isFinite(n) || n < 0) continue;
      if (key === "seuil_caution_nuits" && !Number.isInteger(n)) continue;
    } else if (textKeys.includes(key)) {
      if (typeof rawValue !== "string" || rawValue.length > 200) continue;
      value = rawValue.trim();
    } else {
      continue;
    }
    await sql`
      INSERT INTO settings (key, value) VALUES (${key}, ${value})
      ON CONFLICT (key) DO UPDATE SET value = ${value}
    `;
  }

  const settings = await getSettings(sql);

  // Les réglages apparaissent sur toutes les pages (footer, tarifs, conditions) : on invalide tout le site.
  revalidatePath("/", "layout");

  return Response.json(settings);
}
