import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const articles: Record<string, { title: string; date: string; tag: string; content: string }> = {
  "randonnees-vosges": {
    title: "Les 5 plus belles randonnées autour de Jeuxey",
    date: "2025-03-15",
    tag: "Randonnée",
    content: `
Les Vosges offrent un terrain de jeu exceptionnel pour les amateurs de randonnée. Au départ de Jeuxey,
plusieurs sentiers balisés par le Club Vosgien permettent d'explorer forêts de sapins, chaumes et crêtes panoramiques.

**1. Le tour du Fossard** — 12 km, dénivelé 350m. Une boucle forestière classique avec vue sur la plaine lorraine.

**2. La Roche du Diable** — 8 km, facile. Un rocher offrant un panorama sur la vallée de la Moselle.

**3. Les Hautes Chaumes** — 15 km, intermédiaire. Paysages ouverts sur les crêtes entre Vosges et Alsace.

**4. Cascade de Tendon** — 6 km, facile, idéal en famille. La plus haute cascade des Vosges.

**5. Lac de Gérardmer en boucle** — 10 km, départ depuis le lac. Forêts et vues lacustres tout au long.
    `,
  },
  "epinal-art-deco": {
    title: "Épinal, capitale de l'image et joyau Art Déco",
    date: "2025-02-20",
    tag: "Culture",
    content: `
À seulement 15 minutes de L'Aubier, Épinal est une ville surprenante qui mérite une demi-journée d'exploration.

**Le Musée de l'Image** abrite la plus grande collection d'images d'Épinal au monde — ces estampes populaires
gravées et coloriées qui ont traversé les siècles.

**L'architecture Art Déco** s'étale sur plusieurs rues du centre-ville, reconstruit après la Première Guerre mondiale.
La Basilique Saint-Maurice et la préfecture sont deux exemples remarquables.

**Les Jardins du Cours** longent la Moselle et offrent une promenade idéale en toute saison.
    `,
  },
  "gastronomie-vosgienne": {
    title: "Gastronomie vosgienne : ce qu'il faut goûter",
    date: "2025-01-10",
    tag: "Gastronomie",
    content: `
La Lorraine et les Vosges ont une identité gastronomique forte, marquée par les produits de terroir et les traditions rurales.

**Munster AOP** — le fromage à croûte lavée des hautes chaumes vosgiennes. À déguster chaud ou avec du cumin.

**Quiche lorraine** — originaire de Lorraine, à base d'œufs, crème, lardons fumés. Simple et parfaite.

**Tarte aux myrtilles** — les myrtilles des Vosges sont ramassées à la main en forêt chaque été.

**Mirabelle de Lorraine** — petite prune dorée, AOP et fêtée chaque août à Metz. En tarte, en confit, en eau-de-vie.

**Bière de Blanche Fontaine** — brasserie artisanale vosgienne à découvrir.
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.content.trim().slice(0, 155),
  };
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-2 py-1 bg-[#c8813a]/30 text-[#e8b87a] rounded-full">
                {article.tag}
              </span>
              <time className="text-xs text-[#8aab94]">
                {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl italic text-[#f7f5f0]">
              {article.title}
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="prose prose-stone max-w-none bg-white rounded-xl p-8 border border-[#b8cfc0]/30">
            {article.content.trim().split("\n\n").map((para, i) => (
              <p key={i} className="text-[#3a3d42] text-sm leading-7 mb-4">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#b8cfc0]/30 flex items-center justify-between">
            <Link href="/blog" className="text-sm text-[#8aab94] hover:text-[#c8813a] transition-colors">
              ← Retour au blog
            </Link>
            <Link
              href="/reservation"
              className="text-sm bg-[#c8813a] hover:bg-[#e8b87a] text-white px-4 py-2 rounded transition-colors"
            >
              Réserver L'Aubier
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
