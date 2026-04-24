import { generateIcal } from "@/lib/ical";

export async function GET() {
  const icsContent = await generateIcal();

  return new Response(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="laubier.ics"',
      "Cache-Control": "no-store",
    },
  });
}
