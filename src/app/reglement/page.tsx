import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Règlement intérieur",
  description:
    "Règlement intérieur de L'Aubier, studio de location saisonnière à Jeuxey (88). Arrivée, départ, animaux, tabac, bruit, caution et responsabilités.",
  openGraph: {
    title: "Règlement intérieur | L'Aubier",
    description: "Conditions d'occupation du studio L'Aubier à Jeuxey (Vosges).",
    url: "https://www.aubier-vosges.fr/reglement",
  },
};

const articles = [
  {
    n: 1,
    title: "Arrivée et départ",
    text: "Arrivée à partir de 16h00. Départ avant 10h00. Tout départ tardif non convenu préalablement avec le propriétaire pourra être facturé.",
  },
  {
    n: 2,
    title: "Capacité maximale",
    text: "2 personnes maximum. Toute personne supplémentaire non déclarée est formellement interdite.",
  },
  {
    n: 3,
    title: "Animaux",
    text: "Les animaux de compagnie ne sont pas acceptés, quelle que soit leur espèce.",
  },
  {
    n: 4,
    title: "Tabac",
    text: "Strictement interdit à l'intérieur du logement. Toléré sur la terrasse extérieure uniquement, avec obligation de collecter les mégots.",
  },
  {
    n: 5,
    title: "Bruit et tranquillité",
    text: "Silence demandé à partir de 22h00. Les fêtes et soirées bruyantes sont soumises à l'accord préalable du propriétaire.",
  },
  {
    n: 6,
    title: "Parking",
    text: "Une place de stationnement privée est incluse pour un seul véhicule.",
  },
  {
    n: 7,
    title: "Propreté",
    text: "Le logement doit être rendu propre et rangé à votre départ. Des frais de ménage supplémentaires pourront être facturés en cas de dégradation anormale.",
  },
  {
    n: 8,
    title: "Caution",
    text: "Une caution de 300 € est demandée à l'arrivée. Elle est restituée dans les 48h après le départ, déduction faite des éventuels dommages.",
  },
  {
    n: 9,
    title: "Responsabilité",
    text: "Le locataire est responsable de tout dommage causé au logement, au mobilier ou aux équipements durant son séjour.",
  },
  {
    n: 10,
    title: "Signalement",
    text: "Tout problème constaté dans le logement doit être signalé sans délai à contact@aubier-vosges.fr.",
  },
];

export default function ReglementPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[100px] min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl italic text-[#f7f5f0] mb-2">
              Règlement intérieur
            </h1>
            <p className="text-[#8aab94]">Studio de location saisonnière · Jeuxey (88)</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 border border-[#b8cfc0]/30 space-y-6">
            {articles.map((a) => (
              <div key={a.n} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#c8813a] text-white text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                  {a.n}
                </div>
                <div>
                  <p className="font-medium text-[#3a3d42] text-sm mb-1">{a.title}</p>
                  <p className="text-[#3a3d42]/80 text-sm leading-6">{a.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#8aab94] text-center">
            Ce règlement est remis au locataire à la réservation et fait partie intégrante du contrat de location.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
