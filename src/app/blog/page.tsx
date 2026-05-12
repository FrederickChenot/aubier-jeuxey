import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Vosges & Nature",
  description:
    "Découvrez nos articles sur les Vosges : randonnées, gastronomie, patrimoine et conseils pour préparer votre séjour à L'Aubier.",
};

const articles = [
  {
    slug: "week-end-epinal",
    title: "Week-end à Épinal — que faire en 2 jours ?",
    excerpt: "Marché du samedi, Basilique Saint-Maurice, Musée de l'Image, randonnée au lac de Bouzey et route vers Gérardmer : le programme idéal.",
    date: "2025-04-20",
    tag: "Tourisme",
  },
  {
    slug: "architecture-vosges",
    title: "Architecture contemporaine dans les Vosges — entre bois et modernité",
    excerpt: "Bardage cèdre, mélèze, toits plats et éco-constructions : l'architecture vosgienne contemporaine réinvente le rapport à la forêt.",
    date: "2025-04-05",
    tag: "Architecture",
  },
  {
    slug: "randonnees-vosges",
    title: "Les 5 plus belles randonnées autour de Jeuxey",
    excerpt: "Lac de Bouzey, Roche Charlot, Sentier des Dix, Cascades de Tendon : 30 sentiers balisés, 315 km accessibles depuis Jeuxey.",
    date: "2025-03-15",
    tag: "Randonnée",
  },
  {
    slug: "epinal-art-deco",
    title: "Épinal, capitale de l'image et joyau Art Déco",
    excerpt: "Basilique Saint-Maurice, Musée de l'Image unique en Europe, quartier médiéval et bords de Moselle à 15 min de L'Aubier.",
    date: "2025-02-20",
    tag: "Culture",
  },
  {
    slug: "gastronomie-vosgienne",
    title: "Gastronomie vosgienne : ce qu'il faut goûter",
    excerpt: "Munster AOP, quiche lorraine, tarte aux myrtilles, Marcaire, eau-de-vie de mirabelle… et le marché du samedi à Épinal.",
    date: "2025-01-10",
    tag: "Gastronomie",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic text-[#f7f5f0] mb-2">
              Blog
            </h1>
            <p className="text-[#8aab94]">Vosges, nature et art de vivre</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          {articles.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="block group">
              <article className="bg-white rounded-xl p-6 border border-[#b8cfc0]/30 hover:border-[#8aab94]/60 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs px-2 py-1 bg-[#b8cfc0]/30 text-[#3a3d42] rounded-full">
                    {a.tag}
                  </span>
                  <time className="text-xs text-[#8aab94]">
                    {new Date(a.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl italic text-[#3a3d42] mb-2 group-hover:text-[#c8813a] transition-colors">
                  {a.title}
                </h2>
                <p className="text-[#8aab94] text-sm">{a.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
