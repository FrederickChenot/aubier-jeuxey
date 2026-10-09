import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { isRangeAvailable } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  if (!checkin || !checkout) {
    return Response.json({ error: "checkin and checkout required" }, { status: 400 });
  }

  try {
    const available = await isRangeAvailable(getDb(), checkin, checkout);
    return Response.json({ available });
  } catch (err) {
    console.error("Availability check error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
