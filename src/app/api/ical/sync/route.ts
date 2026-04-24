import { NextRequest } from "next/server";

// iCal Airbnb sync — désactivé jusqu'à réception de AIRBNB_ICAL_URL
// Route prête à activer : décommenter le corps de la fonction et configurer la variable d'env.

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.AIRBNB_ICAL_URL) {
    return Response.json({ message: "AIRBNB_ICAL_URL not configured — sync skipped" });
  }

  // Décommenter pour activer la sync Airbnb :
  // const nodeIcal = await import("node-ical");
  // const { getDb } = await import("@/lib/db");
  // const res = await fetch(process.env.AIRBNB_ICAL_URL);
  // const text = await res.text();
  // const events = nodeIcal.sync.parseICS(text);
  // const sql = getDb();
  // for (const event of Object.values(events)) {
  //   if (event.type !== "VEVENT" || !event.start || !event.end) continue;
  //   await sql`
  //     INSERT INTO reservations (checkin, checkout, guest_name, guest_email, guest_phone,
  //       guests_count, total_price, status, source, message)
  //     VALUES (${event.start}, ${event.end}, 'Airbnb Guest', '', '', 1, 0, 'confirmed', 'airbnb', ${event.summary ?? ''})
  //     ON CONFLICT DO NOTHING
  //   `;
  // }

  return Response.json({ message: "Sync ready — set AIRBNB_ICAL_URL to activate" });
}
