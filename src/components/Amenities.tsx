const amenities = [
  {
    icon: "🌡️",
    title: "Climatisation réversible",
    desc: "Pompe à chaleur — chaud/froid toute l'année",
  },
  {
    icon: "🌿",
    title: "Terrasse bambous",
    desc: "Espace extérieur privatif et végétalisé",
  },
  {
    icon: "🚗",
    title: "Parking sécurisé",
    desc: "Place privée et couverte incluse",
  },
  {
    icon: "🍃",
    title: "Cuisine sauge & bois",
    desc: "Entièrement équipée, esthétique soignée",
  },
  {
    icon: "📶",
    title: "WiFi très haut débit",
    desc: "Fibre optique — télétravail possible",
  },
  {
    icon: "✨",
    title: "Rénovation 2025",
    desc: "Matériaux nobles, design soigné au détail",
  },
];

export default function Amenities() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#3a3d42] mb-2 text-center">
          Équipements
        </h2>
        <p className="text-[#8aab94] text-center text-sm mb-10">
          Tout le confort pour un séjour parfait
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((a) => (
            <div
              key={a.title}
              className="flex gap-4 p-5 rounded-xl bg-[#f7f5f0] border border-[#b8cfc0]/30 hover:border-[#8aab94]/60 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-[#b8cfc0] flex items-center justify-center text-xl flex-shrink-0">
                {a.icon}
              </div>
              <div>
                <p className="font-medium text-[#3a3d42] text-sm">{a.title}</p>
                <p className="text-[#8aab94] text-sm mt-0.5">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
