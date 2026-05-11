"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Reservation {
  id: number;
  checkin: string;
  checkout: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests_count: number;
  total_price: number;
  status: string;
  source: string;
  message: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  blocked: "bg-gray-100 text-gray-600",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmée",
  pending: "En attente",
  cancelled: "Annulée",
  blocked: "Bloquée",
};

export default function ReservationsManager({ reservations }: { reservations: Reservation[] }) {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [detail, setDetail] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState<number | null>(null);

  async function updateStatus(id: number, status: "confirmed" | "cancelled") {
    setLoading(id);
    await fetch(`/api/admin/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(null);
    router.refresh();
  }

  const months = Array.from(
    new Set(reservations.map((r) => r.checkin.slice(0, 7)))
  ).sort((a, b) => b.localeCompare(a));

  const filtered = reservations.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (filterMonth !== "all" && !r.checkin.startsWith(filterMonth)) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f7f5f0]">
      <AdminSidebar />
      <div className="flex-1 md:ml-56">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-6">
            Réservations
          </h1>

          {/* Filters */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] bg-white focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="cancelled">Annulées</option>
            </select>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] bg-white focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
            >
              <option value="all">Tous les mois</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {new Date(m + "-01").toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-[#b8cfc0]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#b8cfc0]/20 bg-[#f7f5f0]">
                    {["Dates", "Voyageur", "Tél.", "Pers.", "Total", "Statut", "Source", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest text-[#8aab94] font-normal whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-[#b8cfc0]/10 hover:bg-[#f7f5f0] transition-colors">
                      <td className="px-4 py-3 text-[#3a3d42] whitespace-nowrap">
                        {new Date(r.checkin).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        {" → "}
                        {new Date(r.checkout).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[#3a3d42]">{r.guest_name}</p>
                        <p className="text-[#8aab94] text-xs">{r.guest_email}</p>
                      </td>
                      <td className="px-4 py-3 text-[#8aab94] text-xs whitespace-nowrap">{r.guest_phone}</td>
                      <td className="px-4 py-3 text-[#8aab94] text-center">{r.guests_count}</td>
                      <td className="px-4 py-3 text-[#3a3d42] font-medium whitespace-nowrap">{Number(r.total_price).toFixed(0)} €</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusColors[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {statusLabels[r.status] ?? r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#8aab94] text-xs capitalize">{r.source}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => setDetail(r)}
                            className="text-xs text-[#8aab94] hover:text-[#3a3d42] underline underline-offset-2"
                          >
                            Détails
                          </button>
                          {r.status === "pending" && (
                            <button
                              onClick={() => updateStatus(r.id, "confirmed")}
                              disabled={loading === r.id}
                              className="text-xs text-green-600 hover:text-green-800 disabled:opacity-40"
                            >
                              Confirmer
                            </button>
                          )}
                          {r.status !== "cancelled" && (
                            <button
                              onClick={() => {
                                if (confirm(`Annuler la réservation de ${r.guest_name} ?`)) {
                                  updateStatus(r.id, "cancelled");
                                }
                              }}
                              disabled={loading === r.id}
                              className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40"
                            >
                              Annuler
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-[#8aab94] text-sm">
                        Aucune réservation
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-xl italic text-[#3a3d42] mb-4">
              Réservation #{detail.id}
            </h2>
            <dl className="space-y-2 text-sm">
              {[
                ["Voyageur", detail.guest_name],
                ["Email", detail.guest_email],
                ["Téléphone", detail.guest_phone],
                ["Arrivée", new Date(detail.checkin).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
                ["Départ", new Date(detail.checkout).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
                ["Personnes", String(detail.guests_count)],
                ["Total", `${Number(detail.total_price).toFixed(0)} €`],
                ["Statut", statusLabels[detail.status] ?? detail.status],
                ["Source", detail.source],
                ["Créé le", new Date(detail.created_at).toLocaleDateString("fr-FR")],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="text-[#8aab94] w-24 shrink-0">{k}</dt>
                  <dd className="text-[#3a3d42]">{v}</dd>
                </div>
              ))}
              {detail.message && (
                <div className="pt-2 border-t border-[#b8cfc0]/30">
                  <dt className="text-[#8aab94] mb-1">Message</dt>
                  <dd className="text-[#3a3d42] bg-[#f7f5f0] rounded p-2 text-xs">{detail.message}</dd>
                </div>
              )}
            </dl>
            <button
              onClick={() => setDetail(null)}
              className="mt-5 w-full border border-[#b8cfc0] text-[#8aab94] py-2 rounded-lg text-sm hover:border-[#8aab94] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
