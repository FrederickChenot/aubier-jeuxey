"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface Reservation {
  id: number;
  checkin: string;
  checkout: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests_count: number;
  total_price: number;
  deposit_amount: number | null;
  status: string;
  source: string;
  created_at: string;
}

interface Stats {
  this_month_count: string;
  this_month_revenue: string;
  total_confirmed: string;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  blocked: "bg-gray-100 text-gray-600",
};

export default function AdminDashboard({
  reservations,
  stats,
}: {
  reservations: Reservation[];
  stats: Stats;
}) {
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  async function syncAirbnb() {
    setSyncing(true);
    setSyncMsg(null);
    const res = await fetch("/api/ical/sync", { method: "POST" });
    const data = await res.json();
    setSyncMsg(data.message ?? "Sync terminée");
    setSyncing(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <header className="bg-[#3a3d42] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-lg italic text-[#f7f5f0]">
            L&apos;Aubier
          </Link>
          <span className="text-[#8aab94] text-sm">Admin</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-sm text-[#8aab94] hover:text-[#f7f5f0] transition-colors"
        >
          Déconnexion
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-[#b8cfc0]/30">
            <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-1">Réservations ce mois</p>
            <p className="text-3xl font-medium text-[#3a3d42]">{stats.this_month_count}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[#b8cfc0]/30">
            <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-1">CA ce mois</p>
            <p className="text-3xl font-medium text-[#c8813a]">{Number(stats.this_month_revenue).toFixed(0)} €</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[#b8cfc0]/30">
            <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-1">Total confirmées</p>
            <p className="text-3xl font-medium text-[#3a3d42]">{stats.total_confirmed}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <Link
            href="/admin/reservations"
            className="text-sm bg-[#3a3d42] text-[#f7f5f0] px-4 py-2 rounded hover:bg-[#3a3d42]/80 transition-colors"
          >
            Gérer les dates bloquées
          </Link>
          <button
            onClick={syncAirbnb}
            disabled={syncing}
            className="text-sm bg-[#8aab94] text-white px-4 py-2 rounded hover:bg-[#8aab94]/80 disabled:opacity-40 transition-colors"
          >
            {syncing ? "Sync en cours…" : "Sync Airbnb"}
          </button>
          <a
            href="/api/ical"
            target="_blank"
            className="text-sm border border-[#b8cfc0] text-[#8aab94] px-4 py-2 rounded hover:border-[#8aab94] transition-colors"
          >
            Exporter iCal
          </a>
        </div>

        {syncMsg && (
          <p className="text-sm text-[#8aab94] bg-[#b8cfc0]/20 rounded px-3 py-2 mb-4">{syncMsg}</p>
        )}

        {/* Reservations table */}
        <div className="bg-white rounded-xl border border-[#b8cfc0]/30 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#b8cfc0]/30">
            <h2 className="font-medium text-[#3a3d42]">Réservations récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#b8cfc0]/20 bg-[#f7f5f0]">
                  {["Dates", "Voyageur", "Pers.", "Total", "Statut", "Source"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest text-[#8aab94] font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b border-[#b8cfc0]/10 hover:bg-[#f7f5f0] transition-colors">
                    <td className="px-4 py-3 text-[#3a3d42]">
                      {new Date(r.checkin).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      {" → "}
                      {new Date(r.checkout).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[#3a3d42]">{r.guest_name}</p>
                      <p className="text-[#8aab94] text-xs">{r.guest_email}</p>
                    </td>
                    <td className="px-4 py-3 text-[#8aab94]">{r.guests_count}</td>
                    <td className="px-4 py-3 text-[#3a3d42] font-medium">{r.total_price} €</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#8aab94] text-xs capitalize">{r.source}</td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[#8aab94] text-sm">
                      Aucune réservation pour l&apos;instant
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
