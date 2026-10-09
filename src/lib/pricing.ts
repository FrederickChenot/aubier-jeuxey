import { differenceInCalendarDays } from "date-fns";
import type { SiteSettings } from "./settings";

export interface PriceBreakdown {
  nights: number;
  nightsTotal: number;
  cleaningFee: number;
  total: number;
}

export function calculatePrice(checkin: Date, checkout: Date, settings: SiteSettings): PriceBreakdown {
  const nights = Math.max(0, differenceInCalendarDays(checkout, checkin));
  const nightsTotal = nights * settings.prix_nuit;
  const total = nightsTotal + settings.frais_menage;

  return { nights, nightsTotal, cleaningFee: settings.frais_menage, total };
}
