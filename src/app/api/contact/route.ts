import { NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (typeof name !== "string" || !name.trim() || name.length > 100) {
    return Response.json({ error: "Nom invalide." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return Response.json({ error: "Email invalide." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    return Response.json({ error: "Message invalide." }, { status: 400 });
  }

  try {
    await sendContactEmail(name, email, message);
    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return Response.json({ error: "Une erreur est survenue. Veuillez réessayer." }, { status: 500 });
  }
}
