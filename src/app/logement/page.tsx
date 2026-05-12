import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Amenities from "@/components/Amenities";
import MapEmbed from "@/components/MapEmbed";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le logement",
  description:
    "Découvrez L'Aubier en détail : galerie complète, équipements, superficie et informations pratiques pour votre séjour dans les Vosges.",
};

const photos = [
  { label: "Salon — sol stratifié lames effet bois" },
  { label: "Cuisine vert sauge et bois" },
  { label: "Espace nuit" },
  { label: "Salle de bain" },
  { label: "Terrasse bambous" },
  { label: "Façade bardage bois" },
];

export default function LogementPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[100px]">
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
            <span>🏡 Terrasse privative bambous</span>
            <span>🚗 1 place privée</span>
          </div>
        </div>

        {/* Full gallery */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-6">
              Galerie complète
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((p) => (
                <div
                  key={p.label}
                  className="aspect-[4/3] bg-gradient-to-br from-[#b8cfc0]/40 to-[#d4a96a]/20 rounded-xl flex items-center justify-center"
                >
                  <span className="text-[#8aab94] text-sm">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Amenities />

        {/* Pratical info */}
        <section className="py-12 px-4 bg-[#f7f5f0]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-4">
                Informations pratiques
              </h2>
              <ul className="space-y-3 text-sm text-[#3a3d42]">
                <li><strong>Arrivée :</strong> 16h – 20h (horaires flexibles sur demande)</li>
                <li><strong>Départ :</strong> avant 10h</li>
                <li><strong>Caution :</strong> 300 € (non débitée, libérée 48h après départ)</li>
                <li><strong>Ménage :</strong> 40 € inclus dans le tarif</li>
                <li><strong>Animaux :</strong> non acceptés</li>
                <li><strong>Fumeur :</strong> non fumeur (toléré en extérieur uniquement)</li>
              </ul>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl italic text-[#3a3d42] mb-4">
                À proximité
              </h2>
              <ul className="space-y-3 text-sm text-[#3a3d42]">
                <li>🛒 Supermarché — 3 km</li>
                <li>🌊 Lac de Gérardmer — 30 min</li>
                <li>⛷️ Domaines skiables — 35 min</li>
                <li>🥾 Sentiers GR — départ depuis Jeuxey</li>
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
