import type { MetadataRoute } from "next";
import { loadSettings } from "@/lib/loadSettings";

const BASE = "https://www.aubier-vosges.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { reservations_ouvertes } = await loadSettings();
  // En mode vitrine, ces deux pages sont en noindex : elles n'ont pas leur place dans le sitemap.
  const bookingPages: MetadataRoute.Sitemap = reservations_ouvertes
    ? [
        { url: `${BASE}/disponibilites`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
        { url: `${BASE}/reservation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      ]
    : [];

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/logement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...bookingPages,
    { url: `${BASE}/reglement`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/blog/week-end-epinal`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/architecture-vosges`, lastModified: new Date("2026-04-05"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/randonnees-vosges`, lastModified: new Date("2026-03-15"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/epinal-art-deco`, lastModified: new Date("2026-02-20"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/gastronomie-vosgienne`, lastModified: new Date("2026-01-10"), changeFrequency: "monthly", priority: 0.5 },
  ];
}
