import { differenceInCalendarDays } from "date-fns";
import { PRICE_PER_NIGHT, CLEANING_FEE, DEPOSIT_RATE, DEPOSIT_THRESHOLD_NIGHTS } from "./stripe";

export interface PriceBreakdown {
  nights: number;
  nightsTotal: number;
  cleaningFee: number;
  total: number;
  depositAmount: number | null;
}

export function calculatePrice(checkin: Date, checkout: Date): PriceBreakdown {
  const nights = differenceInCalendarDays(checkout, checkin);
  const nightsTotal = nights * PRICE_PER_NIGHT;
  const total = nightsTotal + CLEANING_FEE;
  const depositAmount = nights > DEPOSIT_THRESHOLD_NIGHTS ? Math.ceil(total * DEPOSIT_RATE) : null;

  return { nights, nightsTotal, cleaningFee: CLEANING_FEE, total, depositAmount };
}
