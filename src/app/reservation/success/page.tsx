import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Réservation confirmée",
  description: "Votre réservation à L'Aubier est confirmée. Merci !",
};

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#8aab94] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#3a3d42] mb-3">
            Réservation confirmée !
          </h1>
          <p className="text-[#8aab94] mb-8">
            Un email de confirmation avec tous les détails de votre séjour vous a été envoyé.
            Le fichier calendrier (.ics) y est joint pour ajouter votre séjour à votre agenda.
          </p>

          <div className="bg-white rounded-xl p-6 border border-[#b8cfc0]/30 mb-8 text-left space-y-3">
            <p className="text-sm font-medium text-[#3a3d42]">Ce qui vous attend</p>
            <div className="flex gap-3 text-sm text-[#8aab94]">
              <span>📧</span>
              <span>Email de confirmation avec vos détails</span>
            </div>
            <div className="flex gap-3 text-sm text-[#8aab94]">
              <span>📅</span>
              <span>Fichier .ics joint pour votre agenda</span>
            </div>
            <div className="flex gap-3 text-sm text-[#8aab94]">
              <span>📱</span>
              <span>Contact du propriétaire 48h avant votre arrivée</span>
            </div>
            <div className="flex gap-3 text-sm text-[#8aab94]">
              <span>🔑</span>
              <span>Remise des clés à votre arrivée</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 border border-[#b8cfc0] text-[#8aab94] py-3 rounded-lg text-sm hover:border-[#8aab94] transition-colors text-center"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/logement"
              className="flex-1 bg-[#c8813a] hover:bg-[#e8b87a] text-white py-3 rounded-lg text-sm transition-colors text-center"
            >
              Préparer mon séjour
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
