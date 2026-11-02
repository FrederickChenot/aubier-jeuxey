export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendarClient from "./CalendarClient";
import { getDb } from "@/lib/db";
import { getBlockedNights } from "@/lib/availability";
import { syncAirbnbIfStale } from "@/lib/airbnbSync";
import { loadSettings } from "@/lib/loadSettings";
import AirbnbNotice from "@/components/AirbnbNotice";

export async function generateMetadata(): Promise<Metadata> {
  const { reservations_ouvertes } = await loadSettings();

  return {
    title: "Disponibilités",
    description: reservations_ouvertes
      ? "Consultez le calendrier des disponibilités de L'Aubier et réservez votre séjour dans les Vosges."
      : "Les réservations de L'Aubier se font actuellement sur Airbnb.",
    alternates: { canonical: "/disponibilites" },
    ...(reservations_ouvertes ? {} : { robots: { index: false } }),
  };
}

async function getBlockedDates(): Promise<string[]> {
  try {
    return await getBlockedNights(getDb());
  } catch {
    return [];
  }
}

export default async function DisponibilitesPage() {
  const { reservations_ouvertes } = await loadSettings();
  if (reservations_ouvertes) await syncAirbnbIfStale(15);
  const blockedDates = reservations_ouvertes ? await getBlockedDates() : [];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic text-[#f7f5f0] mb-2">
              Disponibilités
            </h1>
            {reservations_ouvertes && (
              <p className="text-[#8aab94]">
                Choisissez votre date d&apos;arrivée
              </p>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          {reservations_ouvertes ? <CalendarClient blockedDates={blockedDates} /> : <AirbnbNotice />}
        </div>
      </main>
      <Footer />
    </>
  );
}
