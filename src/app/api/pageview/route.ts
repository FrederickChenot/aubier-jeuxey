import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { page } = await request.json();
  const referrer = request.headers.get("referer") ?? null;

  try {
    const sql = getDb();
    await sql`INSERT INTO page_views (page, referrer) VALUES (${page}, ${referrer})`;
  } catch {
    // Non-critical — swallow silently
  }

  return Response.json({ ok: true });
}
