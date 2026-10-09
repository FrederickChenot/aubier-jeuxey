import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "./ReservationForm";
import { getDb } from "@/lib/db";
import { getSettings, type SiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre séjour à L'Aubier directement, sans frais de plateforme.",
};

const DEFAULT_SETTINGS: SiteSettings = {
  prix_nuit: 75,
  frais_menage: 40,
  caution: 300,
  cadeau_direct: "Panier d'accueil vosgien offert",
};

type Props = {
  searchParams: Promise<{ checkin?: string; checkout?: string }>;
};

export default async function ReservationPage({ searchParams }: Props) {
  const { checkin, checkout } = await searchParams;

  let settings = DEFAULT_SETTINGS;
  try {
    settings = await getSettings(getDb());
  } catch {
    // keep defaults
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic text-[#f7f5f0] mb-2">
              Réservation
            </h1>
            <p className="text-[#8aab94]">Réservation directe · Sans frais de plateforme</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <ReservationForm initialCheckin={checkin} initialCheckout={checkout} settings={settings} />
        </div>
      </main>
      <Footer />
    </>
  );
}
