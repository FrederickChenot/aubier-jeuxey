"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Stats {
  this_month_count: string;
  this_month_revenue: string;
  occupation_rate: number;
  next_checkin: string | null;
  next_guest: string | null;
}

const cards = (stats: Stats) => [
  {
    label: "Réservations ce mois",
    value: stats.this_month_count,
    unit: "",
    color: "text-[#3a3d42]",
  },
  {
    label: "Taux d'occupation",
    value: `${stats.occupation_rate}`,
    unit: "%",
    color: "text-[#8aab94]",
  },
  {
    label: "Revenus ce mois",
    value: Number(stats.this_month_revenue).toFixed(0),
    unit: " €",
    color: "text-[#c8813a]",
  },
  {
    label: "Prochaine arrivée",
    value: stats.next_checkin
      ? new Date(stats.next_checkin).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
      : "—",
    unit: "",
    sub: stats.next_guest ?? "",
    color: "text-[#3a3d42]",
  },
];

export default function AdminDashboard({ stats, icalUrl }: { stats: Stats; icalUrl: string }) {
  return (
    <div className="flex min-h-screen bg-[#f7f5f0]">
      <AdminSidebar />
      <div className="flex-1 md:ml-56">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-6">
            Tableau de bord
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards(stats).map((card) => (
              <div key={card.label} className="bg-white rounded-xl p-5 border border-[#b8cfc0]/30">
                <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-2 leading-tight">{card.label}</p>
                <p className={`text-3xl font-medium ${card.color}`}>
                  {card.value}
                  <span className="text-lg">{card.unit}</span>
                </p>
                {card.sub && <p className="text-xs text-[#8aab94] mt-1">{card.sub}</p>}
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap mb-6">
            <SyncButton />
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#b8cfc0]/30 max-w-xl">
            <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-2">URL du calendrier iCal (privée)</p>
            <IcalUrlField icalUrl={icalUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IcalUrlField({ icalUrl }: { icalUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(icalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        readOnly
        value={icalUrl}
        onFocus={(e) => e.target.select()}
        className="flex-1 border border-[#b8cfc0] rounded-lg px-3 py-2 text-xs text-[#3a3d42] bg-[#f7f5f0] focus:outline-none"
      />
      <button
        onClick={copy}
        className="text-sm bg-[#8aab94] text-white px-4 py-2 rounded hover:bg-[#8aab94]/80 transition-colors whitespace-nowrap"
      >
        {copied ? "Copié !" : "Copier"}
      </button>
    </div>
  );
}

function SyncButton() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sync() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/sync-airbnb", { method: "POST" });
      const data = await res.json();
      setResult(res.ok ? data.message ?? "Sync terminée" : data.error ?? "Erreur de synchronisation");
    } catch {
      setResult("Erreur réseau lors de la synchronisation.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={sync}
        disabled={loading}
        className="text-sm bg-[#8aab94] text-white px-4 py-2 rounded hover:bg-[#8aab94]/80 disabled:opacity-40 transition-colors"
      >
        {loading ? "Synchronisation…" : "Sync Airbnb"}
      </button>
      {result && <p className="text-xs text-[#8aab94]">{result}</p>}
    </div>
  );
}
