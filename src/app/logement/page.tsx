import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import MapEmbed from "@/components/MapEmbed";
import Link from "next/link";
import { loadSettings } from "@/lib/loadSettings";

export const metadata: Metadata = {
  title: "Le logement",
  description:
    "Découvrez L'Aubier en détail : galerie complète, équipements, superficie et informations pratiques pour votre séjour dans les Vosges.",
  alternates: { canonical: "/logement" },
};

export default async function LogementPage() {
  const settings = await loadSettings();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl italic text-[#f7f5f0] mb-2">
              Le logement
            </h1>
            <p className="text-[#8aab94]">Studio design · Jeuxey · Vosges · Rénovation 2025</p>
          </div>
        </div>

        {/* Details strip */}
        <div className="bg-[#f7f5f0] border-b border-[#b8cfc0]/30 py-4 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-6 text-sm text-[#3a3d42]">
            <span>🏠 Studio plain-pied (37 m²)</span>
            <span>👥 2 voyageurs max</span>
            <span>🛏️ Lit double 140×190 cm</span>
            <span>🚿 Douche italienne · WC suspendu · sèche-serviette</span>
            <span>🌿 Terrasse privative & jardin japonais</span>
            <span>🚗 1 place privée</span>
          </div>
        </div>

        <Gallery title="Galerie complète" />

        <Amenities />

        {/* Pratical info */}
        <section className="py-12 px-4 bg-[#f7f5f0]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-4">
                Informations pratiques
              </h2>
              <ul className="space-y-3 text-sm text-[#3a3d42]">
                <li><strong>Arrivée :</strong> autonome (boîte à clés) à partir de 16h, sans heure limite</li>
                <li><strong>Départ :</strong> avant 10h</li>
                <li>
                  <strong>Caution :</strong> {settings.caution} € — empreinte bancaire sans débit jusqu&apos;à{" "}
                  {settings.seuil_caution_nuits} nuits, virement au-delà (
                  <Link href="/conditions" className="text-[#c8813a] underline hover:text-[#e8b87a]">
                    conditions
                  </Link>
                  )
                </li>
                <li><strong>Ménage :</strong> {settings.frais_menage} € par séjour, ajoutés au total</li>
                <li><strong>Taxe de séjour :</strong> en supplément, par adulte et par nuit (mineurs exonérés)</li>
                <li><strong>Animaux :</strong> non acceptés</li>
                <li><strong>Fumeur :</strong> non fumeur (toléré en extérieur uniquement)</li>
                {settings.numero_enregistrement && (
                  <li><strong>N° d&apos;enregistrement :</strong> {settings.numero_enregistrement}</li>
                )}
              </ul>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-4">
                À proximité
              </h2>
              <ul className="space-y-3 text-sm text-[#3a3d42]">
                <li>🛒 Hypermarché Carrefour — moins de 1 km</li>
                <li>🌊 Lac de Gérardmer — 42 km</li>
                <li>⛷️ Domaines skiables — 35 min</li>
                <li>🥾 Sentiers balisés du Club Vosgien à proximité</li>
                <li>🏛️ Épinal (ville art déco) — 15 min</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-6">
              Localisation
            </h2>
            <MapEmbed />
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#3a3d42] py-12 px-4 text-center">
          <p className="text-[#b8cfc0] mb-4">Convaincu ? Réservez directement sans frais.</p>
          <Link
            href="/reservation"
            className="inline-block bg-[#c8813a] hover:bg-[#e8b87a] text-white font-medium px-8 py-3 rounded transition-colors"
          >
            Réserver
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
