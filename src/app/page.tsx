import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import PriceCalculator from "@/components/PriceCalculator";
import LocationSection from "@/components/LocationSection";
import WhyDirect from "@/components/WhyDirect";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import JsonLd from "@/components/JsonLd";
import type { SiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "L'Aubier — Studio design · Jeuxey · Vosges",
  description:
    "Studio 37 m² plain-pied entièrement rénové en 2025, au cœur des Vosges. Lit 140×190, douche italienne, terrasse bambous privative, parking inclus. 75€/nuit sans frais de plateforme.",
  openGraph: {
    title: "L'Aubier — Studio design · Jeuxey · Vosges",
    description: "Studio 37 m² rénové 2025 dans les Vosges. Terrasse privative, parking, douche italienne. 75€/nuit.",
    url: "https://www.aubier-vosges.fr",
  },
};

const DEFAULTS: SiteSettings = { prix_nuit: 75, frais_menage: 40, caution: 300 };

async function loadSettings(): Promise<SiteSettings> {
  if (!process.env.DATABASE_URL) return DEFAULTS;
  try {
    const { getDb } = await import("@/lib/db");
    const { getSettings } = await import("@/lib/settings");
    return await getSettings(getDb());
  } catch {
    return DEFAULTS;
  }
}

export default async function Home() {
  const settings = await loadSettings();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <Amenities />
        <PriceCalculator
          pricePerNight={settings.prix_nuit}
          cleaningFee={settings.frais_menage}
          deposit={settings.caution}
        />
        <LocationSection />
        <WhyDirect />
      </main>
      <Footer />
      <CookieBanner />
      <JsonLd />
    </>
  );
}
