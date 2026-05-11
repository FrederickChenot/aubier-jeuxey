import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await request.json();

  if (!["confirmed", "cancelled", "pending"].includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const sql = getDb();
  const [row] = await sql`
    UPDATE reservations SET status = ${status} WHERE id = ${id} RETURNING *
  `;

  if (!row) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(row);
}
