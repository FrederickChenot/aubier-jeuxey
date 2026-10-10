"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { calculatePrice, formatEuro } from "@/lib/pricing";
import type { SiteSettings } from "@/lib/settings";

interface Props {
  settings: SiteSettings;
}

export default function PriceCalculator({ settings }: Props) {
  const router = useRouter();
  const today = new Date();
  const [checkin, setCheckin] = useState(format(addDays(today, 7), "yyyy-MM-dd"));
  const [checkout, setCheckout] = useState(format(addDays(today, 10), "yyyy-MM-dd"));
  const [adults, setAdults] = useState(2);

  const { nights, nightsTotal, cleaningFee, touristTax, total } = calculatePrice(
    new Date(checkin),
    new Date(checkout),
    settings,
    { adults, children: 0 }
  );

  function handleReserve() {
    if (nights <= 0) return;
    router.push(`/reservation?checkin=${checkin}&checkout=${checkout}&adults=${adults}`);
  }

  return (
    <section className="py-16 px-4 bg-[#3a3d42]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#f7f5f0] mb-2 text-center">
          Calculez votre séjour
        </h2>
        <p className="text-[#8aab94] text-center text-sm mb-10">
          Tarif direct · pas de frais de plateforme
        </p>

        <div className="max-w-2xl mx-auto bg-[#f7f5f0] rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Arrivée</label>
              <input
                type="date"
                value={checkin}
                min={format(addDays(today, 1), "yyyy-MM-dd")}
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-[#3a3d42] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Départ</label>
              <input
                type="date"
                value={checkout}
                min={checkin}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-[#3a3d42] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Adultes</label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-[#3a3d42] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
            >
              <option value={1}>1 adulte</option>
              <option value={2}>2 adultes</option>
            </select>
          </div>

          {nights > 0 ? (
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-[#3a3d42]">
                <span>{settings.prix_nuit} € × {nights} nuit{nights > 1 ? "s" : ""}</span>
                <span>{nightsTotal} €</span>
              </div>
              <div className="flex justify-between text-sm text-[#3a3d42]">
                <span>Frais de ménage</span>
                <span>{cleaningFee} €</span>
              </div>
              <div className="flex justify-between text-sm text-[#3a3d42]">
                <span>Taxe de séjour</span>
                <span>{formatEuro(touristTax)} €</span>
              </div>
              <div className="flex justify-between text-sm text-[#8aab94] italic">
                <span>
                  {nights <= settings.seuil_caution_nuits
                    ? "Caution (empreinte bancaire, non débitée)"
                    : "Caution (virement, restituée sous 48h)"}
                </span>
                <span>{settings.caution} €</span>
              </div>
              <div className="border-t border-[#b8cfc0] pt-3 flex justify-between font-medium text-[#3a3d42]">
                <span>Total</span>
                <span className="text-[#c8813a] text-lg">{formatEuro(total)} €</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#8aab94] text-center mb-6 py-4">
              Sélectionnez vos dates pour voir le prix
            </p>
          )}

          <button
            onClick={handleReserve}
            disabled={nights <= 0}
            className="w-full bg-[#c8813a] hover:bg-[#e8b87a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            Réserver ce séjour
          </button>
        </div>
      </div>
    </section>
  );
}
