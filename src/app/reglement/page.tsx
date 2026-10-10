import type { Metadata } from "next";
import LegalPage, { type LegalArticle } from "@/components/LegalPage";
import { loadSettings } from "@/lib/loadSettings";
import { cautionParagraphs } from "@/lib/legalTexts";

export const metadata: Metadata = {
  title: "Règlement intérieur",
  description:
    "Règlement intérieur de L'Aubier, studio de location saisonnière à Jeuxey (88). Arrivée, départ, animaux, tabac, bruit, caution et responsabilités.",
  alternates: { canonical: "/reglement" },
  openGraph: {
    title: "Règlement intérieur | L'Aubier",
    description: "Conditions d'occupation du studio L'Aubier à Jeuxey (Vosges).",
    url: "https://www.aubier-vosges.fr/reglement",
  },
};

export default async function ReglementPage() {
  const settings = await loadSettings();

  const articles: LegalArticle[] = [
    {
      title: "Arrivée et départ",
      content: <p>Arrivée autonome (boîte à clés) à partir de 16h, sans heure limite. Départ avant 10h. Tout départ tardif non convenu préalablement avec le propriétaire pourra être facturé.</p>,
    },
    {
      title: "Capacité maximale",
      content: <p>2 personnes maximum. Toute personne supplémentaire non déclarée est formellement interdite.</p>,
    },
    {
      title: "Animaux",
      content: <p>Les animaux de compagnie ne sont pas acceptés, quelle que soit leur espèce.</p>,
    },
    {
      title: "Tabac",
      content: <p>Strictement interdit à l&apos;intérieur du logement. Toléré sur la terrasse extérieure uniquement, avec obligation de collecter les mégots.</p>,
    },
    {
      title: "Bruit et tranquillité",
      content: <p>Silence demandé à partir de 22h00. Les fêtes et soirées bruyantes sont soumises à l&apos;accord préalable du propriétaire.</p>,
    },
    {
      title: "Parking",
      content: <p>Une place de stationnement privée est incluse pour un seul véhicule.</p>,
    },
    {
      title: "Propreté",
      content: <p>Le logement doit être rendu propre et rangé à votre départ. Des frais de ménage supplémentaires pourront être facturés en cas de dégradation anormale.</p>,
    },
    {
      title: "Caution",
      content: cautionParagraphs(settings).map((p) => <p key={p}>{p}</p>),
    },
    {
      title: "Responsabilité",
      content: <p>Le locataire est responsable de tout dommage causé au logement, au mobilier ou aux équipements durant son séjour.</p>,
    },
    {
      title: "Signalement",
      content: <p>Tout problème constaté dans le logement doit être signalé sans délai à contact@aubier-vosges.fr.</p>,
    },
  ];

  return (
    <LegalPage
      title="Règlement intérieur"
      subtitle="Studio de location saisonnière · Jeuxey (88)"
      articles={articles}
      footnote="Ce règlement est remis au locataire à la réservation et fait partie intégrante du contrat de location."
    />
  );
}
