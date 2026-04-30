import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/email";
import ical from "ical-generator";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { checkin, checkout, guestName, guestEmail, guestPhone, guestsCount, totalPrice, message } = body;

  if (!checkin || !checkout || !guestName || !guestEmail || !guestPhone) {
    return Response.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const sql = getDb();

  const [resConflict] = await sql`
    SELECT id FROM reservations
    WHERE status IN ('confirmed', 'pending')
      AND checkin < ${checkout}::date
      AND checkout > ${checkin}::date
    LIMIT 1
  `;
  const [blockConflict] = await sql`
    SELECT id FROM blocked_dates
    WHERE date_start < ${checkout}::date
      AND date_end > ${checkin}::date
    LIMIT 1
  `;
  if (resConflict || blockConflict) {
    return Response.json({ error: "Ces dates ne sont plus disponibles." }, { status: 409 });
  }

  const [reservation] = await sql`
    INSERT INTO reservations
      (checkin, checkout, guest_name, guest_email, guest_phone,
       guests_count, total_price, status, source, message)
    VALUES
      (${checkin}, ${checkout}, ${guestName}, ${guestEmail},
       ${guestPhone}, ${Number(guestsCount)}, ${Number(totalPrice)},
       'pending', 'direct', ${message || null})
    RETURNING *
  `;

  const cal = ical({ name: "L'Aubier", timezone: "Europe/Paris" });
  const ev = cal.createEvent({
    start: new Date(checkin),
    end: new Date(checkout),
    summary: "Séjour à L'Aubier · Jeuxey · Vosges",
    description: "Votre demande de séjour à L'Aubier a été enregistrée.\nContact : contact@aubier-vosges.fr",
  });
  ev.uid(`reservation-${reservation.id}@aubier-vosges.fr`);

  await Promise.all([
    sendOwnerNotification({ guestName, guestEmail, guestPhone, guestsCount: Number(guestsCount), checkin, checkout, totalPrice: Number(totalPrice), message }),
    sendGuestConfirmation({ guestName, guestEmail, guestPhone, guestsCount: Number(guestsCount), checkin, checkout, totalPrice: Number(totalPrice), message }, cal.toString()),
  ]);

  return Response.json({ ok: true });
}
