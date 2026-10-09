import { BrevoClient } from "@getbrevo/brevo";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function getMailer() {
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });
}

const SENDER = { name: "L'Aubier", email: "contact@aubier-vosges.fr" };

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

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendOwnerNotification(data: ReservationData) {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) throw new Error("OWNER_EMAIL n'est pas défini dans les variables d'environnement");

  const guestName = escapeHtml(data.guestName);
  const guestEmail = escapeHtml(data.guestEmail);
  const guestPhone = escapeHtml(data.guestPhone);
  const message = data.message ? escapeHtml(data.message) : null;

  await getMailer().transactionalEmails.sendTransacEmail({
    sender: SENDER,
    to: [{ email: ownerEmail }],
    subject: `Nouvelle réservation — ${guestName} · ${formatDate(data.checkin)}`,
    htmlContent: `
      <h2>Nouvelle réservation confirmée</h2>
      <table>
        <tr><td><strong>Voyageur</strong></td><td>${guestName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${guestEmail}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${guestPhone}</td></tr>
        <tr><td><strong>Arrivée</strong></td><td>${formatDate(data.checkin)}</td></tr>
        <tr><td><strong>Départ</strong></td><td>${formatDate(data.checkout)}</td></tr>
        <tr><td><strong>Voyageurs</strong></td><td>${data.guestsCount} personne(s)</td></tr>
        <tr><td><strong>Total</strong></td><td>${data.totalPrice} €</td></tr>
        ${data.depositAmount ? `<tr><td><strong>Acompte perçu</strong></td><td>${data.depositAmount} €</td></tr>` : ""}
        ${message ? `<tr><td><strong>Message</strong></td><td>${message}</td></tr>` : ""}
      </table>
    `,
  });
}

export async function sendGuestConfirmation(data: ReservationData, icsContent: string) {
  const guestName = escapeHtml(data.guestName);

  await getMailer().transactionalEmails.sendTransacEmail({
    sender: SENDER,
    to: [{ email: data.guestEmail, name: data.guestName }],
    subject: `Confirmation de votre séjour à L'Aubier · ${formatDate(data.checkin)}`,
    htmlContent: `
      <h2>Votre demande de réservation est bien reçue !</h2>
      <p>Bonjour ${guestName},</p>
      <p>Nous avons bien reçu votre demande et nous vous contacterons très prochainement pour confirmer votre séjour.</p>
      <h3>Détails du séjour</h3>
      <table>
        <tr><td><strong>Arrivée</strong></td><td>${formatDate(data.checkin)}</td></tr>
        <tr><td><strong>Départ</strong></td><td>${formatDate(data.checkout)}</td></tr>
        <tr><td><strong>Voyageurs</strong></td><td>${data.guestsCount} personne(s)</td></tr>
        <tr><td><strong>Total estimé</strong></td><td>${data.totalPrice} €</td></tr>
      </table>
      <p>Le fichier calendrier (.ics) est joint à cet email pour bloquer les dates dans votre agenda.</p>
      <p>À très bientôt dans les Vosges !<br>L'équipe de L'Aubier</p>
    `,
    attachment: [
      { name: "sejour-aubier.ics", content: Buffer.from(icsContent).toString("base64") },
    ],
  });
}

export async function sendContactEmail(name: string, email: string, message: string) {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) throw new Error("OWNER_EMAIL n'est pas défini dans les variables d'environnement");

  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  await getMailer().transactionalEmails.sendTransacEmail({
    sender: SENDER,
    to: [{ email: ownerEmail }],
    replyTo: { email, name },
    subject: `Message de contact — ${safeName}`,
    htmlContent: `<p><strong>De :</strong> ${safeName} (${escapeHtml(email)})</p><p>${safeMessage}</p>`,
  });
}
