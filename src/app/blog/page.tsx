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
    slug: "randonnees-vosges",
    title: "Les 5 plus belles randonnées autour de Jeuxey",
    excerpt: "Des sentiers pour tous les niveaux au départ du village, entre forêts de sapins et crêtes vosgiennes.",
    date: "2025-03-15",
    tag: "Randonnée",
  },
  {
    slug: "epinal-art-deco",
    title: "Épinal, capitale de l'image et joyau Art Déco",
    excerpt: "À 15 minutes du studio, Épinal cache une architecture remarquable et un musée de l'image unique en Europe.",
    date: "2025-02-20",
    tag: "Culture",
  },
  {
    slug: "gastronomie-vosgienne",
    title: "Gastronomie vosgienne : ce qu'il faut goûter",
    excerpt: "Munster AOP, quiche lorraine, tarte aux myrtilles, mirabelle… Le guide complet des saveurs locales.",
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
