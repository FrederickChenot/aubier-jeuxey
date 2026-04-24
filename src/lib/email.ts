import { Resend } from "resend";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
}

interface ReservationData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestsCount: number;
  checkin: string;
  checkout: string;
  totalPrice: number;
  depositAmount?: number;
  message?: string;
  icsAttachment?: string;
}

function formatDate(d: string) {
  return format(new Date(d), "d MMMM yyyy", { locale: fr });
}

export async function sendOwnerNotification(data: ReservationData) {
  await getResend().emails.send({
    from: "L'Aubier <noreply@laubier.fr>",
    to: process.env.OWNER_EMAIL!,
    subject: `Nouvelle réservation — ${data.guestName} · ${formatDate(data.checkin)}`,
    html: `
      <h2>Nouvelle réservation confirmée</h2>
      <table>
        <tr><td><strong>Voyageur</strong></td><td>${data.guestName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.guestEmail}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${data.guestPhone}</td></tr>
        <tr><td><strong>Arrivée</strong></td><td>${formatDate(data.checkin)}</td></tr>
        <tr><td><strong>Départ</strong></td><td>${formatDate(data.checkout)}</td></tr>
        <tr><td><strong>Voyageurs</strong></td><td>${data.guestsCount} personne(s)</td></tr>
        <tr><td><strong>Total</strong></td><td>${data.totalPrice} €</td></tr>
        ${data.depositAmount ? `<tr><td><strong>Acompte perçu</strong></td><td>${data.depositAmount} €</td></tr>` : ""}
        ${data.message ? `<tr><td><strong>Message</strong></td><td>${data.message}</td></tr>` : ""}
      </table>
    `,
  });
}

export async function sendGuestConfirmation(data: ReservationData, icsContent: string) {
  await getResend().emails.send({
    from: "L'Aubier <noreply@laubier.fr>",
    to: data.guestEmail,
    subject: `Confirmation de votre séjour à L'Aubier · ${formatDate(data.checkin)}`,
    html: `
      <h2>Votre réservation est confirmée !</h2>
      <p>Bonjour ${data.guestName},</p>
      <p>Nous avons bien reçu votre paiement et votre séjour est confirmé.</p>
      <h3>Détails du séjour</h3>
      <table>
        <tr><td><strong>Arrivée</strong></td><td>${formatDate(data.checkin)}</td></tr>
        <tr><td><strong>Départ</strong></td><td>${formatDate(data.checkout)}</td></tr>
        <tr><td><strong>Voyageurs</strong></td><td>${data.guestsCount} personne(s)</td></tr>
        <tr><td><strong>Montant payé</strong></td><td>${data.depositAmount ?? data.totalPrice} €</td></tr>
        ${data.depositAmount ? `<tr><td><strong>Solde restant</strong></td><td>${data.totalPrice - data.depositAmount} € (à régler sur place)</td></tr>` : ""}
      </table>
      <p>Le fichier calendrier (.ics) est joint à cet email. Retrouvez également votre séjour sur <a href="https://laubier.fr/reservation/success">notre site</a>.</p>
      <p>À très bientôt dans les Vosges !<br>L'équipe de L'Aubier</p>
    `,
    attachments: [
      {
        filename: "sejour-laubier.ics",
        content: Buffer.from(icsContent).toString("base64"),
      },
    ],
  });
}

export async function sendContactEmail(name: string, email: string, message: string) {
  await getResend().emails.send({
    from: "L'Aubier <noreply@laubier.fr>",
    to: process.env.OWNER_EMAIL!,
    replyTo: email,
    subject: `Message de contact — ${name}`,
    html: `<p><strong>De :</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br>")}</p>`,
  });
}
