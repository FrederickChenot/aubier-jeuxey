import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendarClient from "./CalendarClient";
import { getDb } from "@/lib/db";

export const metadata: Metadata = {
  title: "Disponibilités",
  description: "Consultez le calendrier des disponibilités de L'Aubier et réservez votre séjour dans les Vosges.",
};

async function getBlockedDates(): Promise<string[]> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT checkin::text as date FROM reservations WHERE status IN ('confirmed','pending')
      UNION
      SELECT generate_series(date_start, date_end - INTERVAL '1 day', INTERVAL '1 day')::date::text
      FROM blocked_dates
    `;
    return rows.map((r) => r.date as string);
  } catch {
    return [];
  }
}

export default async function DisponibilitesPage() {
  const blockedDates = await getBlockedDates();

  return (
    <>
      <Navbar />
      <main className="pt-[100px] min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic text-[#f7f5f0] mb-2">
              Disponibilités
            </h1>
            <p className="text-[#8aab94]">
              Vert = libre · Rouge = occupé · Cliquez sur une date pour réserver
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <CalendarClient blockedDates={blockedDates} />
        </div>
      </main>
      <Footer />
    </>
  );
}
