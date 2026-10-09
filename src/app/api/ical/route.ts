import { NextRequest } from "next/server";
import { generateIcal } from "@/lib/ical";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!process.env.ICAL_TOKEN || token !== process.env.ICAL_TOKEN) {
    return new Response(null, { status: 404 });
  }

  const icsContent = await generateIcal();

  return new Response(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="aubier-vosges.ics"',
      "Cache-Control": "no-store",
    },
  });
}
