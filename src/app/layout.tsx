import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { loadSettings } from "@/lib/loadSettings";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { reservations_ouvertes } = await loadSettings();

  return {
    title: {
      default: "L'Aubier — Studio design · Jeuxey · Vosges",
      template: "%s | L'Aubier",
    },
    description: `Studio 37 m² plain-pied entièrement rénové en 2025 au cœur des Vosges. Lit 140×190, douche italienne, terrasse privative et jardin japonais, stationnement gratuit devant le portillon.${reservations_ouvertes ? " Sans frais de plateforme." : ""}`,
    keywords: ["location vacances Vosges", "studio Jeuxey", "gîte Vosges", "location courte durée"],
    metadataBase: new URL("https://www.aubier-vosges.fr"),
    verification: {
      google: "6xptqfoJkblP71xlM3R2FGLmRxlL9PQFvNtm6ZypTYo",
    },
    openGraph: {
      siteName: "L'Aubier",
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
