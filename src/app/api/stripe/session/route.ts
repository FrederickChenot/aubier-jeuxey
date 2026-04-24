import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    checkin,
    checkout,
    guestName,
    guestEmail,
    guestPhone,
    guestsCount,
    totalPrice,
    depositAmount,
    amountDue,
    message,
  } = body;

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: Math.round(amountDue * 100),
          product_data: {
            name: depositAmount
              ? `L'Aubier — Acompte séjour (${checkin} → ${checkout})`
              : `L'Aubier — Séjour (${checkin} → ${checkout})`,
            description: `${guestName} · ${guestsCount} voyageur(s)`,
          },
        },
        quantity: 1,
      },
    ],
    customer_email: guestEmail,
    metadata: {
      checkin,
      checkout,
      guestName,
      guestEmail,
      guestPhone,
      guestsCount: String(guestsCount),
      totalPrice: String(totalPrice),
      depositAmount: depositAmount ? String(depositAmount) : "",
      message: message ?? "",
    },
    success_url: `${process.env.NEXTAUTH_URL}/reservation/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/reservation`,
  });

  return Response.json({ url: session.url });
}
