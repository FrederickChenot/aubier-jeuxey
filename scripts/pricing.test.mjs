import { test } from "node:test";
import assert from "node:assert/strict";
import { parseISO } from "date-fns";
import { calculatePrice } from "../src/lib/pricing.ts";
import { DEFAULT_SETTINGS } from "../src/lib/settings.ts";

const price = (checkin, checkout, adults, children = 0) =>
  calculatePrice(parseISO(checkin), parseISO(checkout), DEFAULT_SETTINGS, { adults, children });
const cents = (amount) => Math.round(amount * 100);

test("Airbnb : mardi 17/11 → 18/11, 2 adultes = 79,13 €", () => {
  assert.equal(cents(price("2026-11-17", "2026-11-18", 2).total), 7913);
});

test("Airbnb : mardi 17/11 → 18/11, 1 adulte = 79,00 € (taxe plafonnée)", () => {
  assert.equal(cents(price("2026-11-17", "2026-11-18", 1).total), 7900);
});

test("Airbnb : lundi 16/11 → 23/11, 2 adultes = 505,60 € (réduction arrondie nuit par nuit)", () => {
  const p = price("2026-11-16", "2026-11-23", 2);
  assert.equal(p.nights, 7);
  assert.equal(cents(p.nightsTotal), 53250);
  assert.equal(cents(p.discount), 5326);
  assert.equal(p.discountLabel, "Réduction semaine");
  assert.equal(cents(p.total), 50560);
});

test("vendredi et samedi sont majorés, pas le jeudi ni le dimanche", () => {
  assert.equal(cents(price("2026-11-19", "2026-11-20", 2).nightsTotal), 7500);
  assert.equal(cents(price("2026-11-20", "2026-11-21", 2).nightsTotal), 7875);
  assert.equal(cents(price("2026-11-21", "2026-11-22", 2).nightsTotal), 7875);
  assert.equal(cents(price("2026-11-22", "2026-11-23", 2).nightsTotal), 7500);
});

test("6 nuits : pas de réduction ; 28 nuits : réduction mois", () => {
  assert.equal(price("2026-11-16", "2026-11-22", 2).discount, 0);
  const p = price("2026-11-16", "2026-12-14", 2);
  assert.equal(p.discountLabel, "Réduction mois");
  assert.equal(cents(p.nightsTotal), 213000);
  assert.equal(cents(p.discount), 63904);
  assert.equal(cents(p.touristTax), 8200);
  assert.equal(cents(p.total), 157296);
});

test("l'enfant compte comme occupant mais ne paie pas la taxe", () => {
  assert.equal(cents(price("2026-11-17", "2026-11-18", 1, 1).touristTax), 206);
});
