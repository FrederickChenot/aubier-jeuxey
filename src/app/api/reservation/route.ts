import { NextRequest } from "next/server";
import { addDays, differenceInCalendarDays, parseISO, startOfDay, isValid } from "date-fns";
import { getDb } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { calculatePrice } from "@/lib/pricing";
import { isRangeAvailable } from "@/lib/availability";
import { sendOwnerNotification, sendGuestConfirmation } from "@/lib/email";
import ical from "ical-generator";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NIGHTS = 30;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { checkin, checkout, guestName, guestEmail, guestPhone, guestsCount, message, website } = body;

  // Honeypot — un champ caché rempli signale un bot : on répond succès sans rien enregistrer.
  if (website) {
    return Response.json({ ok: true });
  }

  if (typeof checkin !== "string" || typeof checkout !== "string") {
    return Response.json({ error: "Dates invalides." }, { status: 400 });
  }
  const checkinDate = parseISO(checkin);
  const checkoutDate = parseISO(checkout);
  if (!isValid(checkinDate) || !isValid(checkoutDate)) {
    return Response.json({ error: "Dates invalides." }, { status: 400 });
  }

  const tomorrow = startOfDay(addDays(new Date(), 1));
  if (checkinDate < tomorrow) {
    return Response.json({ error: "La date d'arrivée doit être au moins demain." }, { status: 400 });
  }
  if (checkoutDate <= checkinDate) {
    return Response.json({ error: "La date de départ doit être après la date d'arrivée." }, { status: 400 });
  }
  if (differenceInCalendarDays(checkoutDate, checkinDate) > MAX_NIGHTS) {
    return Response.json({ error: "Pour un séjour de plus de 30 nuits, contactez-nous." }, { status: 400 });
  }

  const guests = Number(guestsCount);
  if (!Number.isInteger(guests) || guests < 1 || guests > 2) {
    return Response.json({ error: "Le nombre de voyageurs doit être 1 ou 2." }, { status: 400 });
  }

  if (typeof guestName !== "string" || !guestName.trim() || guestName.length > 100) {
    return Response.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (typeof guestEmail !== "string" || !EMAIL_REGEX.test(guestEmail)) {
    return Response.json({ error: "Email invalide." }, { status: 400 });
  }
  if (typeof guestPhone !== "string" || !guestPhone.trim() || guestPhone.length > 30) {
    return Response.json({ error: "Téléphone invalide." }, { status: 400 });
  }
  if (message != null && (typeof message !== "string" || message.length > 2000)) {
    return Response.json({ error: "Message trop long." }, { status: 400 });
  }

  const sql = getDb();

  const available = await isRangeAvailable(sql, checkin, checkout);
  if (!available) {
    return Response.json({ error: "Ces dates ne sont plus disponibles." }, { status: 409 });
  }

  const settings = await getSettings(sql);
  const { total } = calculatePrice(checkinDate, checkoutDate, settings);

  const [reservation] = await sql`
    INSERT INTO reservations
      (checkin, checkout, guest_name, guest_email, guest_phone,
       guests_count, total_price, status, source, message)
    VALUES
      (${checkin}, ${checkout}, ${guestName}, ${guestEmail},
       ${guestPhone}, ${guests}, ${total},
       'pending', 'direct', ${message || null})
    RETURNING *
  `;

  const cal = ical({ name: "L'Aubier", timezone: "Europe/Paris" });
  const ev = cal.createEvent({
    start: checkinDate,
    end: checkoutDate,
    summary: "Séjour à L'Aubier · Jeuxey · Vosges",
    description: "Votre demande de séjour à L'Aubier a été enregistrée.\nContact : contact@aubier-vosges.fr",
  });
  ev.uid(`reservation-${reservation.id}@aubier-vosges.fr`);

  const data = { guestName, guestEmail, guestPhone, guestsCount: guests, checkin, checkout, totalPrice: total, message };

  const [ownerResult, guestResult] = await Promise.allSettled([
    sendOwnerNotification(data),
    sendGuestConfirmation(data, cal.toString()),
  ]);

  if (ownerResult.status === "rejected") {
    console.error("[reservation] échec email propriétaire :", ownerResult.reason);
  }
  if (guestResult.status === "rejected") {
    console.error("[reservation] échec email voyageur :", guestResult.reason);
  }

  return Response.json({ ok: true });
}
