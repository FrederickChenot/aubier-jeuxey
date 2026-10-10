"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { SiteSettings } from "@/lib/settings";

type NumberKey =
  | "prix_nuit"
  | "frais_menage"
  | "caution"
  | "seuil_caution_nuits"
  | "ts_taux"
  | "ts_plafond"
  | "ts_majoration";

interface NumberField {
  key: NumberKey;
  label: string;
  unit: string;
  help: string;
}

const tarifFields: NumberField[] = [
  { key: "prix_nuit", label: "Tarif par nuit", unit: "€", help: "Affiché sur la page d'accueil et dans le calculateur" },
  { key: "frais_menage", label: "Frais de ménage", unit: "€", help: "Ajoutés au total de chaque réservation" },
  { key: "caution", label: "Caution", unit: "€", help: "Montant affiché dans le calculateur, le règlement et les conditions" },
  { key: "seuil_caution_nuits", label: "Seuil caution", unit: "nuits", help: "Jusqu'à ce nombre de nuits : empreinte bancaire sans débit. Au-delà : virement." },
];

const taxeFields: NumberField[] = [
  { key: "ts_taux", label: "Taux", unit: "", help: "Part du prix de la nuit par occupant — 0.05 = 5 %" },
  { key: "ts_plafond", label: "Plafond", unit: "€", help: "Plafond par personne et par nuit, avant majoration" },
  { key: "ts_majoration", label: "Taxe additionnelle", unit: "", help: "Majoration appliquée après plafonnement — 0.10 = 10 %" },
];

export default function ParametresManager({ settings }: { settings: SiteSettings }) {
  const [values, setValues] = useState({
    prix_nuit: String(settings.prix_nuit),
    frais_menage: String(settings.frais_menage),
    caution: String(settings.caution),
    seuil_caution_nuits: String(settings.seuil_caution_nuits),
    ts_taux: String(settings.ts_taux),
    ts_plafond: String(settings.ts_plafond),
    ts_majoration: String(settings.ts_majoration),
    cadeau_direct: settings.cadeau_direct,
    numero_enregistrement: settings.numero_enregistrement,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError("Erreur lors de la sauvegarde.");
    }
  }

  function renderNumberFields(fields: NumberField[]) {
    return (
      <div className="space-y-5">
        {fields.map(({ key, label, unit, help }) => (
          <div key={key}>
            <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step={key === "seuil_caution_nuits" ? "1" : "any"}
                value={values[key]}
                onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                className="w-32 border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              />
              <span className="text-sm text-[#8aab94]">{unit}</span>
            </div>
            <p className="text-xs text-[#8aab94] mt-1">{help}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f5f0]">
      <AdminSidebar />
      <div className="flex-1 md:ml-56">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-6">
            Paramètres
          </h1>

          <div className="bg-white rounded-xl border border-[#b8cfc0]/30 p-6 mb-6">
            <h2 className="font-medium text-[#3a3d42] mb-6">Tarifs</h2>
            {renderNumberFields(tarifFields)}
          </div>

          <div className="bg-white rounded-xl border border-[#b8cfc0]/30 p-6 mb-6">
            <h2 className="font-medium text-[#3a3d42] mb-2">Taxe de séjour</h2>
            <p className="text-xs text-[#8aab94] mb-6">
              Tarif proportionnel (meublé non classé) — par adulte et par nuit : min(prix de la nuit ÷ occupants × taux,
              plafond) × (1 + taxe additionnelle). Les mineurs sont exonérés.
            </p>
            {renderNumberFields(taxeFields)}
          </div>

          <div className="bg-white rounded-xl border border-[#b8cfc0]/30 p-6 mb-6">
            <h2 className="font-medium text-[#3a3d42] mb-6">Réservation directe</h2>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">
                Cadeau réservation directe (vide = désactivé)
              </label>
              <input
                type="text"
                maxLength={200}
                value={values.cadeau_direct}
                onChange={(e) => setValues({ ...values, cadeau_direct: e.target.value })}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              />
              <p className="text-xs text-[#8aab94] mt-1">
                Affiché dans la section « Pourquoi réserver en direct ? » et le badge de l'accueil. Laisser vide pour ne rien afficher.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#b8cfc0]/30 p-6">
            <h2 className="font-medium text-[#3a3d42] mb-6">Meublé de tourisme</h2>
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">
                Numéro d'enregistrement (vide = masqué)
              </label>
              <input
                type="text"
                maxLength={200}
                value={values.numero_enregistrement}
                onChange={(e) => setValues({ ...values, numero_enregistrement: e.target.value })}
                className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
              />
              <p className="text-xs text-[#8aab94] mt-1">
                Affiché dans le pied de page et sur la page « Le logement » s'il est renseigné.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#c8813a] hover:bg-[#e8b87a] disabled:opacity-40 text-white px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              {saving ? "Sauvegarde…" : "Sauvegarder"}
            </button>
            {saved && <p className="text-sm text-[#8aab94]">Enregistré.</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <p className="text-xs text-[#8aab94] mt-4">
            Les nouveaux réglages sont pris en compte immédiatement sur le site.
          </p>
        </div>
      </div>
    </div>
  );
}
