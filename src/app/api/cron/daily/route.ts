import { NextRequest } from "next/server";
import { syncAirbnb } from "@/lib/airbnbSync";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncAirbnb();
    return Response.json(result);
  } catch (err) {
    console.error("Cron daily sync error:", err);
    return Response.json({ error: "Sync failed" }, { status: 500 });
  }
}
