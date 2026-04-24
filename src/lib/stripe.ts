import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _stripe = new Stripe(key, {} as any);
  }
  return _stripe;
}

// Keep named export for direct import in files that run only at request time
export { getStripe as stripe };

export const PRICE_PER_NIGHT = 75;
export const CLEANING_FEE = 40;
export const DEPOSIT = 300;
export const DEPOSIT_RATE = 0.30;
export const DEPOSIT_THRESHOLD_NIGHTS = 3;
