import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDb();
  const rows = await sql`
    SELECT * FROM reservations
    ORDER BY checkin DESC
  `;

  return Response.json(rows);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const sql = getDb();

  const [row] = await sql`
    INSERT INTO reservations
      (checkin, checkout, guest_name, guest_email, guest_phone,
       guests_count, total_price, deposit_amount, status, source, message)
    VALUES
      (${body.checkin}, ${body.checkout}, ${body.guestName}, ${body.guestEmail},
       ${body.guestPhone}, ${body.guestsCount}, ${body.totalPrice},
       ${body.depositAmount ?? null}, ${body.status ?? "confirmed"},
       ${body.source ?? "direct"}, ${body.message ?? null})
    RETURNING *
  `;

  return Response.json(row, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });

  const sql = getDb();
  await sql`DELETE FROM reservations WHERE id = ${id}`;
  return Response.json({ success: true });
}
