import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalArticle } from "@/components/LegalPage";
import { loadSettings } from "@/lib/loadSettings";
import { cautionParagraphs } from "@/lib/legalTexts";

export const metadata: Metadata = {
  title: "Conditions de réservation",
  description:
    "Conditions de réservation de L'Aubier à Jeuxey (Vosges) : demande, paiement, annulation, caution, taxe de séjour et modalités du séjour.",
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: "Conditions de réservation | L'Aubier",
    description: "Demande, paiement, annulation, caution et taxe de séjour pour le studio L'Aubier.",
    url: "https://www.aubier-vosges.fr/conditions",
  },
};

export default async function ConditionsPage() {
  const settings = await loadSettings();

  const articles: LegalArticle[] = [
    {
      title: "Demande de réservation",
      content: (
        <p>
          Toute demande envoyée depuis le site est étudiée par le propriétaire, qui y répond sous 48h.
          L&apos;envoi d&apos;une demande ne vaut pas réservation.
        </p>
      ),
    },
    {
      title: "Paiement et confirmation",
      content: (
        <p>
          Si la demande est acceptée, vous recevez un lien de paiement sécurisé par carte bancaire, valable 48h.
          La réservation est confirmée à réception du paiement intégral du séjour.
        </p>
      ),
    },
    {
      title: "Annulation par le voyageur",
      content: (
        <>
          <p>Remboursement intégral jusqu&apos;à 48h avant 16h le jour d&apos;arrivée.</p>
          <p>
            Passé ce délai, aucun remboursement n&apos;est dû, y compris en cas de non-présentation ou de départ anticipé.
          </p>
          <p>La demande d&apos;annulation se fait par email à contact@aubier-vosges.fr.</p>
        </>
      ),
    },
    {
      title: "Annulation par le propriétaire",
      content: <p>Si le propriétaire doit annuler le séjour, les sommes versées sont intégralement remboursées.</p>,
    },
    {
      title: "Droit de rétractation",
      content: (
        <p>
          S&apos;agissant d&apos;une prestation d&apos;hébergement fournie à une date déterminée, la réservation
          n&apos;ouvre pas droit au délai de rétractation (article L221-28 du Code de la consommation).
        </p>
      ),
    },
    {
      title: "Caution",
      content: cautionParagraphs(settings).map((p) => <p key={p}>{p}</p>),
    },
    {
      title: "Taxe de séjour",
      content: (
        <p>
          La taxe de séjour est collectée avec le paiement du séjour et reversée à la Communauté d&apos;Agglomération
          d&apos;Épinal. Les mineurs en sont exonérés.
        </p>
      ),
    },
    {
      title: "Séjours de plus de 30 nuits",
      content: <p>Les séjours de plus de 30 nuits se font sur demande, par email à contact@aubier-vosges.fr.</p>,
    },
    {
      title: "Modalités du séjour",
      content: (
        <p>
          Le logement accueille 2 personnes au maximum. Arrivée autonome dès 16h, départ avant 10h. Le séjour est
          soumis au{" "}
          <Link href="/reglement" className="text-[#c8813a] underline hover:text-[#e8b87a]">
            règlement intérieur
          </Link>
          .
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title="Conditions de réservation"
      subtitle="Réservation directe · Studio L'Aubier · Jeuxey (88)"
      articles={articles}
      footnote="Ces conditions s'appliquent à toute réservation effectuée directement sur ce site."
    />
  );
}
