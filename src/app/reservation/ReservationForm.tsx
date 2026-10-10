"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import Link from "next/link";
import { calculatePrice, formatEuro } from "@/lib/pricing";
import type { SiteSettings } from "@/lib/settings";

const today = new Date();

interface FormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  adults: number;
  children: number;
  message: string;
  website: string;
}

type Step = 1 | 2 | 3;

export default function ReservationForm({
  initialCheckin,
  initialCheckout,
  initialAdults = 1,
  settings,
}: {
  initialCheckin?: string;
  initialCheckout?: string;
  initialAdults?: number;
  settings: SiteSettings;
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
    adults: initialAdults,
    children: 0,
    message: "",
    website: "",
  });
  const [reglementAccepted, setReglementAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { nights, nightsTotal, cleaningFee, touristTax, total } = calculatePrice(
    new Date(checkin),
    new Date(checkout),
    settings,
    { adults: form.adults, children: form.children }
  );

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
        body: JSON.stringify({ checkin, checkout, ...form, termsAccepted: reglementAccepted }),
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
    { n: 1, label: "Séjour" },
    { n: 2, label: "Coordonnées" },
    { n: 3, label: "Confirmation" },
  ];

  return (
    <div>
      {/* Honeypot — champ caché, ne doit jamais être rempli par un humain */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0 overflow-hidden"
      />

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
            Dates et voyageurs
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Adultes</label>
              <select
                value={form.adults}
                onChange={(e) => {
                  const adults = Number(e.target.value);
                  setForm({ ...form, adults, children: adults === 2 ? 0 : form.children });
                }}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              >
                <option value={1}>1 adulte</option>
                <option value={2}>2 adultes</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Enfants de moins de 18 ans</label>
              <select
                value={form.children}
                disabled={form.adults === 2}
                onChange={(e) => setForm({ ...form, children: Number(e.target.value) })}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              >
                <option value={0}>Aucun</option>
                <option value={1}>1 enfant</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-[#8aab94] mb-4">2 personnes maximum au total.</p>

          {availabilityError && (
            <p className="text-red-500 text-sm mb-4">{availabilityError}</p>
          )}

          {nights > 0 && (
            <div className="bg-[#f7f5f0] rounded-xl p-4 mb-4 text-sm text-[#3a3d42] space-y-2">
              <div className="flex justify-between">
                <span>{settings.prix_nuit} € × {nights} nuit{nights > 1 ? "s" : ""}</span>
                <span>{nightsTotal} €</span>
              </div>
              <div className="flex justify-between">
                <span>Ménage</span>
                <span>{cleaningFee} €</span>
              </div>
              <div className="flex justify-between">
                <span>Taxe de séjour</span>
                <span>{formatEuro(touristTax)} €</span>
              </div>
              <div className="flex justify-between font-medium border-t border-[#b8cfc0] pt-2">
                <span>Total</span>
                <span className="text-[#c8813a]">{formatEuro(total)} €</span>
              </div>
              <p className="text-xs text-[#8aab94]">
                Caution {settings.caution} € —{" "}
                {nights <= settings.seuil_caution_nuits
                  ? "empreinte bancaire sans débit"
                  : "par virement, restituée sous 48h après le départ"}
              </p>
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

          <div className="mt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={reglementAccepted}
                onChange={(e) => setReglementAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#c8813a] flex-shrink-0"
              />
              <span className="text-sm text-[#3a3d42]">
                J&apos;ai lu et j&apos;accepte le{" "}
                <Link href="/reglement" target="_blank" className="text-[#c8813a] underline hover:text-[#e8b87a]">
                  règlement intérieur
                </Link>{" "}
                et les{" "}
                <Link href="/conditions" target="_blank" className="text-[#c8813a] underline hover:text-[#e8b87a]">
                  conditions de réservation
                </Link>{" "}
                *
              </span>
            </label>
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
              disabled={!form.guestName || !form.guestEmail || !form.guestPhone || !reglementAccepted}
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
              <span className="text-[#8aab94]">Voyageurs</span>
              <span>
                {form.adults} adulte{form.adults > 1 ? "s" : ""}
                {form.children > 0 ? ` + ${form.children} enfant` : ""}
              </span>
            </div>
            <div className="border-t border-[#b8cfc0] pt-3 flex justify-between">
              <span className="text-[#8aab94]">{settings.prix_nuit} € × {nights} nuit{nights > 1 ? "s" : ""}</span>
              <span>{nightsTotal} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8aab94]">Ménage</span>
              <span>{cleaningFee} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8aab94]">Taxe de séjour</span>
              <span>{formatEuro(touristTax)} €</span>
            </div>
            <div className="border-t border-[#b8cfc0] pt-3 flex justify-between">
              <span className="text-[#8aab94]">Total</span>
              <span className="font-medium text-[#c8813a]">{formatEuro(total)} €</span>
            </div>
          </div>

          <p className="text-xs text-[#8aab94] mb-6">
            Aucun paiement à cette étape. Le propriétaire répond sous 48h ; si votre demande est acceptée, vous
            recevez un lien de paiement sécurisé par carte.
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
