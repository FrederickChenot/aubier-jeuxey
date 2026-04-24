const pills = [
  { label: "Épinal", detail: "15 min" },
  { label: "Gérardmer", detail: "30 min" },
  { label: "Nancy", detail: "1h" },
  { label: "Colmar", detail: "1h15" },
  { label: "Strasbourg", detail: "1h30" },
  { label: "Vosges du Sud", detail: "à portée" },
];

export default function LocationSection() {
  return (
    <section className="py-16 px-4 bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#3a3d42] mb-2 text-center">
          Localisation
        </h2>
        <p className="text-[#8aab94] text-sm text-center mb-10">
          Jeuxey — entre vallées et forêts vosgiennes
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {pills.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#b8cfc0]/40 rounded-full text-sm"
            >
              <span className="font-medium text-[#3a3d42]">{p.label}</span>
              <span className="text-[#8aab94]">{p.detail}</span>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="w-full h-64 md:h-80 bg-[#b8cfc0]/30 rounded-2xl flex items-center justify-center border border-[#b8cfc0]/50">
          <div className="text-center">
            <p className="text-[#8aab94] text-sm">Carte interactive</p>
            <p className="text-[#b8cfc0] text-xs mt-1">Intégrer Google Maps ou Mapbox ici</p>
          </div>
        </div>
      </div>
    </section>
  );
}
