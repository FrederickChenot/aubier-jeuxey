import type { SiteSettings } from "./settings";

// Texte de l'article « Caution », partagé entre le règlement intérieur et les conditions de réservation.
export function cautionParagraphs(settings: SiteSettings): string[] {
  const { caution, seuil_caution_nuits: seuil } = settings;
  return [
    `Une caution de ${caution} € est demandée pour chaque séjour.`,
    `Séjours de ${seuil} nuits ou moins : empreinte bancaire sans débit, demandée 2 jours avant l'arrivée.`,
    `Séjours de plus de ${seuil} nuits : caution versée par virement avant l'arrivée, restituée sous 48h après le départ.`,
    "Le code d'accès au logement est communiqué seulement après validation de la caution.",
    "Une retenue n'est opérée qu'en cas de dommage constaté, photos et justificatifs à l'appui.",
  ];
}
