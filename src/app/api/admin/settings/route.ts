import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
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
  const numericKeys = ["prix_nuit", "frais_menage", "caution"];
  const textKeys = ["cadeau_direct"];
  const sql = getDb();

  for (const [key, rawValue] of Object.entries(body)) {
    let value = rawValue;
    if (numericKeys.includes(key)) {
      if (isNaN(Number(value)) || Number(value) < 0) continue;
    } else if (textKeys.includes(key)) {
      if (typeof value !== "string" || value.length > 200) continue;
      value = value.trim();
    } else {
      continue;
    }
    await sql`
      INSERT INTO settings (key, value) VALUES (${key}, ${value})
      ON CONFLICT (key) DO UPDATE SET value = ${value}
    `;
  }

  const settings = await getSettings(sql);

  revalidatePath("/");
  revalidatePath("/logement");
  revalidatePath("/reservation");

  return Response.json(settings);
}
