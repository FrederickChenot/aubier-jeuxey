import type { MetadataRoute } from "next";

const BASE = "https://www.aubier-vosges.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/logement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/disponibilites`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/reservation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/reglement`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/blog/week-end-epinal`, lastModified: new Date("2025-04-20"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/architecture-vosges`, lastModified: new Date("2025-04-05"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/randonnees-vosges`, lastModified: new Date("2025-03-15"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/epinal-art-deco`, lastModified: new Date("2025-02-20"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/gastronomie-vosgienne`, lastModified: new Date("2025-01-10"), changeFrequency: "monthly", priority: 0.5 },
  ];
}
