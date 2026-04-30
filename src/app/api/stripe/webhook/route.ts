import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/email";
import ical from "ical-generator";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ received: true });
  }

  const session = event.data.object as { metadata: Record<string, string>; id: string };
  const m = session.metadata;

  try {
    const sql = getDb();

    const [reservation] = await sql`
      INSERT INTO reservations
        (checkin, checkout, guest_name, guest_email, guest_phone,
         guests_count, total_price, deposit_amount, status, source,
         stripe_session_id, message)
      VALUES
        (${m.checkin}, ${m.checkout}, ${m.guestName}, ${m.guestEmail},
         ${m.guestPhone}, ${Number(m.guestsCount)}, ${Number(m.totalPrice)},
         ${m.depositAmount ? Number(m.depositAmount) : null},
         'confirmed', 'direct', ${session.id}, ${m.message || null})
      RETURNING *
    `;

    const cal = ical({ name: "L'Aubier", timezone: "Europe/Paris" });
    const ev = cal.createEvent({
      start: new Date(m.checkin),
      end: new Date(m.checkout),
      summary: "Séjour à L'Aubier · Jeuxey · Vosges",
      description: "Confirmation de votre séjour à L'Aubier.\nContact : contact@aubier-vosges.fr",
    });
    ev.uid(`reservation-${reservation.id}@aubier-vosges.fr`);
    const icsContent = cal.toString();

    await Promise.all([
      sendOwnerNotification({
        guestName: m.guestName,
        guestEmail: m.guestEmail,
        guestPhone: m.guestPhone,
        guestsCount: Number(m.guestsCount),
        checkin: m.checkin,
        checkout: m.checkout,
        totalPrice: Number(m.totalPrice),
        depositAmount: m.depositAmount ? Number(m.depositAmount) : undefined,
        message: m.message,
      }),
      sendGuestConfirmation(
        {
          guestName: m.guestName,
          guestEmail: m.guestEmail,
          guestPhone: m.guestPhone,
          guestsCount: Number(m.guestsCount),
          checkin: m.checkin,
          checkout: m.checkout,
          totalPrice: Number(m.totalPrice),
          depositAmount: m.depositAmount ? Number(m.depositAmount) : undefined,
          message: m.message,
        },
        icsContent
      ),
    ]);
  } catch (err) {
    console.error("Webhook processing error:", err);
    return Response.json({ error: "Processing failed" }, { status: 500 });
  }

  return Response.json({ received: true });
}
