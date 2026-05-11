import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "L'Aubier — Studio design · Jeuxey · Vosges",
    template: "%s | L'Aubier",
  },
  description:
    "Studio design entièrement rénové en 2025 au cœur des Vosges. Réservez en direct et économisez 15% vs Airbnb. 75€/nuit, terrasse bambous, cuisine équipée.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
