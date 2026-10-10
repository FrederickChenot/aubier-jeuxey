import type { Metadata } from "next";
import LegalPage, { type LegalArticle } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site aubier-vosges.fr : éditeur, hébergeur et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: "Mentions légales | L'Aubier",
    description: "Éditeur, hébergeur et propriété intellectuelle du site aubier-vosges.fr.",
    url: "https://www.aubier-vosges.fr/mentions-legales",
  },
};

const articles: LegalArticle[] = [
  {
    title: "Éditeur du site",
    content: (
      <>
        <p>Frédérick Chenot, loueur en meublé non professionnel.</p>
        <p>44A Rue d&apos;Épinal, 88000 Jeuxey, France</p>
        <p>SIRET : 833 889 918 00029</p>
        <p>Contact : contact@aubier-vosges.fr</p>
        <p>Directeur de la publication : Frédérick Chenot.</p>
      </>
    ),
  },
  {
    title: "Hébergeur",
    content: (
      <>
        <p>Vercel Inc.</p>
        <p>440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis</p>
        <p>https://vercel.com</p>
      </>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <p>
        Les textes et les photographies de ce site sont la propriété de l&apos;éditeur. Toute reproduction,
        représentation ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      subtitle="aubier-vosges.fr · Studio L'Aubier · Jeuxey (88)"
      articles={articles}
    />
  );
}
