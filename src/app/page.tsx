import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import PriceCalculator from "@/components/PriceCalculator";
import LocationSection from "@/components/LocationSection";
import WhyDirect from "@/components/WhyDirect";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { loadSettings } from "@/lib/loadSettings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSettings();

  return {
    title: "L'Aubier — Studio design · Jeuxey · Vosges",
    description: `Studio 37 m² plain-pied entièrement rénové en 2025, au cœur des Vosges. Lit 140×190, douche italienne, terrasse privative et jardin japonais, parking inclus. ${settings.prix_nuit}€/nuit sans frais de plateforme.`,
    alternates: { canonical: "/" },
    openGraph: {
      title: "L'Aubier — Studio design · Jeuxey · Vosges",
      description: `Studio 37 m² rénové 2025 dans les Vosges. Terrasse privative, parking, douche italienne. ${settings.prix_nuit}€/nuit.`,
      url: "https://www.aubier-vosges.fr",
    },
  };
}

export default async function Home() {
  const settings = await loadSettings();

  return (
    <>
      <Navbar />
      <main>
        <Hero pricePerNight={settings.prix_nuit} cadeauDirect={settings.cadeau_direct} />
        <Gallery />
        <Amenities />
        <PriceCalculator settings={settings} />
        <LocationSection />
        <WhyDirect cadeauDirect={settings.cadeau_direct} />
      </main>
      <Footer />
      <JsonLd pricePerNight={settings.prix_nuit} />
    </>
  );
}
