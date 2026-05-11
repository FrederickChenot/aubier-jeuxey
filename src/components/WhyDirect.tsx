const reasons = [
  {
    pct: "−15%",
    title: "Pas de frais Airbnb",
    desc: "Les plateformes facturent jusqu'à 15% de frais voyageur. Ici : zéro.",
  },
  {
    pct: "Direct",
    title: "Contact direct avec le propriétaire",
    desc: "Questions, demandes spéciales, flexibilité. Nous parlons directement.",
  },
  {
    pct: "Vite",
    title: "Confirmation par email sous 24h",
    desc: "Réservation directe, sans plateforme intermédiaire. Vous recevez un email de confirmation avec fichier .ics.",
  },
];

export default function WhyDirect() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#3a3d42] mb-2 text-center">
          Pourquoi réserver en direct ?
        </h2>
        <p className="text-[#8aab94] text-sm text-center mb-10">
          Le même logement, le même confort, moins cher
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="text-center p-6">
              <p className="text-4xl font-[family-name:var(--font-playfair)] italic text-[#c8813a] mb-3">
                {r.pct}
              </p>
              <p className="font-medium text-[#3a3d42] mb-2">{r.title}</p>
              <p className="text-sm text-[#8aab94]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
