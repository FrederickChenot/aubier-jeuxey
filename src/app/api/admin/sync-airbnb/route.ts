import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { syncAirbnb } from "@/lib/airbnbSync";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const result = await syncAirbnb();
    return Response.json(result);
  } catch (err) {
    console.error("Admin sync-airbnb error:", err);
    return Response.json({ error: "La synchronisation a échoué." }, { status: 500 });
  }
}
