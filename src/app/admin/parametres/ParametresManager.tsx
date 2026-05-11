"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Settings {
  prix_nuit: number;
  frais_menage: number;
  caution: number;
}

export default function ParametresManager({ settings }: { settings: Settings }) {
  const [values, setValues] = useState({
    prix_nuit: String(settings.prix_nuit),
    frais_menage: String(settings.frais_menage),
    caution: String(settings.caution),
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
      body: JSON.stringify({
        prix_nuit: values.prix_nuit,
        frais_menage: values.frais_menage,
        caution: values.caution,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError("Erreur lors de la sauvegarde.");
    }
  }

  const fields: { key: keyof typeof values; label: string; unit: string; help: string }[] = [
    { key: "prix_nuit", label: "Tarif par nuit", unit: "€", help: "Affiché sur la page d'accueil et dans le calculateur" },
    { key: "frais_menage", label: "Frais de ménage", unit: "€", help: "Ajoutés au total de chaque réservation" },
    { key: "caution", label: "Caution", unit: "€", help: "Non débitée, affichée à titre indicatif" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7f5f0]">
      <AdminSidebar />
      <div className="flex-1 md:ml-56">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-6">
            Paramètres
          </h1>

          <div className="bg-white rounded-xl border border-[#b8cfc0]/30 p-6">
            <h2 className="font-medium text-[#3a3d42] mb-6">Tarifs</h2>
            <div className="space-y-5">
              {fields.map(({ key, label, unit, help }) => (
                <div key={key}>
                  <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">{label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
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

            <div className="mt-8 flex items-center gap-4">
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
          </div>

          <p className="text-xs text-[#8aab94] mt-4">
            Les nouveaux tarifs sont pris en compte immédiatement sur le site.
          </p>
        </div>
      </div>
    </div>
  );
}
