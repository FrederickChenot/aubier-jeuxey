import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "./ReservationForm";
import AirbnbNotice from "@/components/AirbnbNotice";
import { loadSettings } from "@/lib/loadSettings";

export async function generateMetadata(): Promise<Metadata> {
  const { reservations_ouvertes } = await loadSettings();

  return {
    title: "Réservation",
    description: reservations_ouvertes
      ? "Réservez votre séjour à L'Aubier directement, sans frais de plateforme."
      : "Les réservations de L'Aubier se font actuellement sur Airbnb.",
    alternates: { canonical: "/reservation" },
    ...(reservations_ouvertes ? {} : { robots: { index: false } }),
  };
}

type Props = {
  searchParams: Promise<{ checkin?: string; checkout?: string; adults?: string }>;
};

export default async function ReservationPage({ searchParams }: Props) {
  const { checkin, checkout, adults } = await searchParams;

  const settings = await loadSettings();

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic text-[#f7f5f0] mb-2">
              Réservation
            </h1>
            {settings.reservations_ouvertes && (
              <p className="text-[#8aab94]">Réservation directe · Sans frais de plateforme</p>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {settings.reservations_ouvertes ? (
            <ReservationForm
              initialCheckin={checkin}
              initialCheckout={checkout}
              initialAdults={adults === "2" ? 2 : 1}
              settings={settings}
            />
          ) : (
            <AirbnbNotice />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
