"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { PRICE_PER_NIGHT, CLEANING_FEE, DEPOSIT } from "@/lib/stripe";

const today = new Date();

interface FormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestsCount: number;
  message: string;
}

type Step = 1 | 2 | 3;

export default function ReservationForm({
  initialCheckin,
  initialCheckout,
}: {
  initialCheckin?: string;
  initialCheckout?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [checkin, setCheckin] = useState(initialCheckin ?? format(addDays(today, 7), "yyyy-MM-dd"));
  const [checkout, setCheckout] = useState(initialCheckout ?? format(addDays(today, 10), "yyyy-MM-dd"));
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [checkingAvail, setCheckingAvail] = useState(false);
  const [form, setForm] = useState<FormData>({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    guestsCount: 1,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nights = Math.max(0, differenceInCalendarDays(new Date(checkout), new Date(checkin)));
  const nightsTotal = nights * PRICE_PER_NIGHT;
  const total = nightsTotal + CLEANING_FEE;

  async function checkAvailability() {
    if (nights <= 0) {
      setAvailabilityError("La date de départ doit être après la date d'arrivée.");
      return false;
    }
    setCheckingAvail(true);
    setAvailabilityError(null);
    const res = await fetch(`/api/availability?checkin=${checkin}&checkout=${checkout}`);
    const data = await res.json();
    setCheckingAvail(false);
    if (!data.available) {
      setAvailabilityError("Ces dates ne sont pas disponibles. Veuillez choisir d'autres dates.");
      return false;
    }
    return true;
  }

  async function handleStep1() {
    const ok = await checkAvailability();
    if (ok) setStep(2);
  }

  async function handleSubmit() {
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkin, checkout, ...form, totalPrice: total }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        setSubmitError(error ?? "Une erreur est survenue. Veuillez réessayer.");
        setLoading(false);
        return;
      }
      router.push("/reservation/success");
    } catch {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  }

  const steps = [
    { n: 1, label: "Dates" },
    { n: 2, label: "Coordonnées" },
    { n: 3, label: "Confirmation" },
  ];

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s.n
                  ? "bg-[#c8813a] text-white"
                  : "bg-[#b8cfc0]/30 text-[#8aab94]"
              }`}
            >
              {s.n}
            </div>
            <span className={`text-sm ${step >= s.n ? "text-[#3a3d42]" : "text-[#8aab94]"}`}>{s.label}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-[#b8cfc0]" />}
          </div>
        ))}
      </div>

      {/* Step 1 — Dates */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 border border-[#b8cfc0]/30">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl italic text-[#3a3d42] mb-6">
            Choisissez vos dates
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Arrivée</label>
              <input
                type="date"
                value={checkin}
                min={format(addDays(today, 1), "yyyy-MM-dd")}
                onChange={(e) => { setCheckin(e.target.value); setAvailabilityError(null); }}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Départ</label>
              <input
                type="date"
                value={checkout}
                min={checkin}
                onChange={(e) => { setCheckout(e.target.value); setAvailabilityError(null); }}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              />
            </div>
          </div>

          {availabilityError && (
            <p className="text-red-500 text-sm mb-4">{availabilityError}</p>
          )}

          {nights > 0 && (
            <div className="bg-[#f7f5f0] rounded-xl p-4 mb-4 text-sm text-[#3a3d42] space-y-2">
              <div className="flex justify-between">
                <span>{PRICE_PER_NIGHT} € × {nights} nuit{nights > 1 ? "s" : ""}</span>
                <span>{nightsTotal} €</span>
              </div>
              <div className="flex justify-between">
                <span>Ménage</span>
                <span>{CLEANING_FEE} €</span>
              </div>
              <div className="flex justify-between font-medium border-t border-[#b8cfc0] pt-2">
                <span>Total</span>
                <span className="text-[#c8813a]">{total} €</span>
              </div>
              <p className="text-xs text-[#8aab94]">Caution {DEPOSIT} € non débitée</p>
            </div>
          )}

          <button
            onClick={handleStep1}
            disabled={checkingAvail || nights <= 0}
            className="w-full bg-[#c8813a] hover:bg-[#e8b87a] disabled:opacity-40 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {checkingAvail ? "Vérification…" : "Vérifier les disponibilités →"}
          </button>
        </div>
      )}

      {/* Step 2 — Guest info */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 border border-[#b8cfc0]/30">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl italic text-[#3a3d42] mb-6">
            Vos coordonnées
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Nom complet *</label>
              <input
                type="text"
                value={form.guestName}
                onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
                placeholder="Jean Dupont"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Email *</label>
              <input
                type="email"
                value={form.guestEmail}
                onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
                placeholder="jean@exemple.fr"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Téléphone *</label>
              <input
                type="tel"
                value={form.guestPhone}
                onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
                placeholder="+33 6 XX XX XX XX"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Nombre de voyageurs</label>
              <select
                value={form.guestsCount}
                onChange={(e) => setForm({ ...form, guestsCount: Number(e.target.value) })}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              >
                <option value={1}>1 voyageur</option>
                <option value={2}>2 voyageurs</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Message (optionnel)</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a] resize-none"
                placeholder="Heure d'arrivée prévue, demande spéciale…"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border border-[#b8cfc0] text-[#8aab94] py-3 rounded-lg text-sm transition-colors hover:border-[#8aab94]"
            >
              ← Retour
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!form.guestName || !form.guestEmail || !form.guestPhone}
              className="flex-1 bg-[#c8813a] hover:bg-[#e8b87a] disabled:opacity-40 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Recap + submit */}
      {step === 3 && (
        <div className="bg-white rounded-2xl p-6 border border-[#b8cfc0]/30">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl italic text-[#3a3d42] mb-6">
            Récapitulatif
          </h2>

          <div className="space-y-3 text-sm text-[#3a3d42] mb-6">
            <div className="flex justify-between">
              <span className="text-[#8aab94]">Arrivée</span>
              <span>{new Date(checkin).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8aab94]">Départ</span>
              <span>{new Date(checkout).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8aab94]">Voyageur</span>
              <span>{form.guestName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8aab94]">Personnes</span>
              <span>{form.guestsCount}</span>
            </div>
            <div className="border-t border-[#b8cfc0] pt-3 flex justify-between">
              <span className="text-[#8aab94]">Total estimé</span>
              <span className="font-medium text-[#c8813a]">{total} €</span>
            </div>
          </div>

          <p className="text-xs text-[#8aab94] mb-6">
            Aucun paiement en ligne. Le propriétaire vous contactera pour confirmer et convenir des modalités.
          </p>

          {submitError && (
            <p className="text-red-500 text-sm mb-4">{submitError}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 border border-[#b8cfc0] text-[#8aab94] py-3 rounded-lg text-sm transition-colors hover:border-[#8aab94]"
            >
              ← Retour
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-[#c8813a] hover:bg-[#e8b87a] disabled:opacity-40 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {loading ? "Envoi en cours…" : "Envoyer ma demande →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
