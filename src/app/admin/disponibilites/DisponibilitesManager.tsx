"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface BlockedDate {
  id: number;
  date_start: string;
  date_end: string;
  reason: string | null;
}

export default function DisponibilitesManager({ blocked }: { blocked: BlockedDate[] }) {
  const router = useRouter();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  async function addBlock() {
    if (!start || !end) return;
    setLoading(true);
    await fetch("/api/admin/blocked-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dateStart: start, dateEnd: end, reason }),
    });
    setStart(""); setEnd(""); setReason("");
    setLoading(false);
    router.refresh();
  }

  async function removeBlock(id: number) {
    await fetch(`/api/admin/blocked-dates?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#f7f5f0]">
      <AdminSidebar />
      <div className="flex-1 md:ml-56">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-6">
            Disponibilités
          </h1>

          {/* Add new block */}
          <div className="bg-white rounded-xl p-6 border border-[#b8cfc0]/30 mb-8">
            <h2 className="font-medium text-[#3a3d42] mb-4">Bloquer des dates</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Début</label>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Fin</label>
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
                />
              </div>
            </div>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Raison : ménage, travaux, perso…"
              className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a] mb-4"
            />
            <button
              onClick={addBlock}
              disabled={loading || !start || !end}
              className="bg-[#c8813a] hover:bg-[#e8b87a] disabled:opacity-40 text-white px-5 py-2 rounded-lg text-sm transition-colors"
            >
              {loading ? "En cours…" : "Bloquer ces dates"}
            </button>
          </div>

          {/* Blocked dates list */}
          <div className="bg-white rounded-xl border border-[#b8cfc0]/30 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#b8cfc0]/30">
              <p className="font-medium text-[#3a3d42] text-sm">
                Dates bloquées ({blocked.length})
              </p>
            </div>
            {blocked.length === 0 ? (
              <p className="text-sm text-[#8aab94] text-center py-8">Aucune date bloquée manuellement</p>
            ) : (
              <ul className="divide-y divide-[#b8cfc0]/20">
                {blocked.map((b) => (
                  <li key={b.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#3a3d42]">
                        {new Date(b.date_start).toLocaleDateString("fr-FR")}
                        {" → "}
                        {new Date(b.date_end).toLocaleDateString("fr-FR")}
                      </p>
                      {b.reason && <p className="text-xs text-[#8aab94]">{b.reason}</p>}
                    </div>
                    <button
                      onClick={() => removeBlock(b.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
