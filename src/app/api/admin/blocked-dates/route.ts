import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { dateStart, dateEnd, reason } = await request.json();
  const sql = getDb();
  const [row] = await sql`
    INSERT INTO blocked_dates (date_start, date_end, reason)
    VALUES (${dateStart}, ${dateEnd}, ${reason ?? null})
    RETURNING *
  `;
  return Response.json(row, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });

  const sql = getDb();
  await sql`DELETE FROM blocked_dates WHERE id = ${id}`;
  return Response.json({ success: true });
}
