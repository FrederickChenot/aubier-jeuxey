"use client";

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

export default function AdminDashboard({ stats }: { stats: Stats }) {
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

          <div className="flex gap-3 flex-wrap">
            <SyncButton />
            <a
              href="/api/ical"
              target="_blank"
              className="text-sm border border-[#b8cfc0] text-[#8aab94] px-4 py-2 rounded hover:border-[#8aab94] transition-colors"
            >
              Exporter iCal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SyncButton() {
  return (
    <button
      onClick={async () => {
        const res = await fetch("/api/ical/sync", { method: "POST" });
        const data = await res.json();
        alert(data.message ?? "Sync terminée");
      }}
      className="text-sm bg-[#8aab94] text-white px-4 py-2 rounded hover:bg-[#8aab94]/80 transition-colors"
    >
      Sync Airbnb
    </button>
  );
}
