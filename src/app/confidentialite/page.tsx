import type { Metadata } from "next";
import LegalPage, { type LegalArticle } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de L'Aubier : données collectées, finalité, sous-traitants, durée de conservation et droits RGPD.",
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    title: "Politique de confidentialité | L'Aubier",
    description: "Données collectées, finalité, conservation et droits RGPD sur aubier-vosges.fr.",
    url: "https://www.aubier-vosges.fr/confidentialite",
  },
};

const articles: LegalArticle[] = [
  {
    title: "Responsable du traitement",
    content: (
      <p>
        Frédérick Chenot, 44A Rue d&apos;Épinal, 88000 Jeuxey — contact@aubier-vosges.fr.
      </p>
    ),
  },
  {
    title: "Données collectées",
    content: (
      <p>
        Les données que vous saisissez dans les formulaires de contact et de réservation : nom, adresse email,
        numéro de téléphone, message, dates du séjour et nombre de voyageurs.
      </p>
    ),
  },
  {
    title: "Finalité et base légale",
    content: (
      <p>
        Ces données servent uniquement à la gestion des demandes et des séjours. Leur traitement repose sur
        l&apos;exécution du contrat de location et des mesures précontractuelles prises à votre demande.
      </p>
    ),
  },
  {
    title: "Sous-traitants",
    content: (
      <>
        <p>Les données sont traitées par les prestataires techniques suivants, pour les seuls besoins du service :</p>
        <ul className="list-disc list-inside">
          <li>Neon — base de données</li>
          <li>Brevo — envoi des emails</li>
          <li>Vercel — hébergement du site</li>
          <li>Stripe — paiement par carte bancaire</li>
        </ul>
        <p>Elles ne sont ni vendues ni cédées à des tiers.</p>
      </>
    ),
  },
  {
    title: "Durée de conservation",
    content: <p>Les données sont conservées 3 ans après la fin du séjour, puis supprimées.</p>,
  },
  {
    title: "Vos droits",
    content: (
      <>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          de limitation, d&apos;opposition et de portabilité de vos données. Pour l&apos;exercer, écrivez à
          contact@aubier-vosges.fr.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
        </p>
      </>
    ),
  },
  {
    title: "Cookies",
    content: (
      <>
        <p>Ce site n&apos;utilise aucun cookie de mesure d&apos;audience.</p>
        <p>
          La carte Google Maps n&apos;est chargée que si vous cliquez sur « Afficher la carte (Google Maps) » ;
          Google peut alors déposer ses propres cookies.
        </p>
      </>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      subtitle="Protection de vos données personnelles · aubier-vosges.fr"
      articles={articles}
    />
  );
}
