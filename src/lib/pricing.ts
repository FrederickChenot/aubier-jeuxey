import { differenceInCalendarDays } from "date-fns";
import type { SiteSettings } from "./settings";

export const MAX_GUESTS = 2;
export const MAX_ADULTS = 2;
export const MAX_CHILDREN = 1;

export interface Guests {
  adults: number;
  children: number;
}

export interface PriceBreakdown {
  nights: number;
  nightsTotal: number;
  cleaningFee: number;
  touristTaxPerPerson: number;
  touristTax: number;
  total: number;
}

function roundCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function isValidGuests({ adults, children }: Guests): boolean {
  return (
    Number.isInteger(adults) &&
    Number.isInteger(children) &&
    adults >= 1 &&
    adults <= MAX_ADULTS &&
    children >= 0 &&
    children <= MAX_CHILDREN &&
    adults + children <= MAX_GUESTS
  );
}

// Taxe de séjour au tarif proportionnel (meublé non classé) : par nuit et par adulte,
// un pourcentage du prix de la nuit par occupant, plafonné, puis majoré de la taxe additionnelle.
// Les mineurs comptent comme occupants mais sont exonérés.
export function touristTaxPerPersonPerNight(settings: SiteSettings, guests: Guests): number {
  const occupants = guests.adults + guests.children;
  if (occupants <= 0) return 0;
  const base = Math.min((settings.prix_nuit / occupants) * settings.ts_taux, settings.ts_plafond);
  return roundCents(base * (1 + settings.ts_majoration));
}

export function calculatePrice(
  checkin: Date,
  checkout: Date,
  settings: SiteSettings,
  guests: Guests
): PriceBreakdown {
  const nights = Math.max(0, differenceInCalendarDays(checkout, checkin));
  const nightsTotal = nights * settings.prix_nuit;
  const touristTaxPerPerson = touristTaxPerPersonPerNight(settings, guests);
  const touristTax = roundCents(touristTaxPerPerson * nights * guests.adults);
  const total = roundCents(nightsTotal + settings.frais_menage + touristTax);

  return { nights, nightsTotal, cleaningFee: settings.frais_menage, touristTaxPerPerson, touristTax, total };
}

export function formatEuro(amount: number): string {
  const value = Number(amount);
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(".", ",");
}
