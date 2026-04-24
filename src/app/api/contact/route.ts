import { NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }

  await sendContactEmail(name, email, message);
  return Response.json({ success: true });
}
