export default function Gallery() {
  const photos = [
    { src: "/photos/salon.jpg", alt: "Salon avec parquet chêne chevrons", className: "row-span-2" },
    { src: "/photos/cuisine.jpg", alt: "Cuisine vert sauge et bois" },
    { src: "/photos/chambre.jpg", alt: "Espace nuit" },
    { src: "/photos/terrasse.jpg", alt: "Terrasse avec bambous" },
    { src: "/photos/facade.jpg", alt: "Façade bardage bois anthracite" },
  ];

  return (
    <section className="py-16 px-4 bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#3a3d42] mb-8 text-center">
          Le logement
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 h-[480px] md:h-[560px]">
          {/* Large photo on left */}
          <div className="row-span-2 bg-[#b8cfc0] rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-[#8aab94] to-[#3a3d42] flex items-center justify-center">
              <span className="text-white/40 text-sm">Salon</span>
            </div>
          </div>

          {/* 4 small photos in a 2×2 grid on the right */}
          {[
            { label: "Cuisine" },
            { label: "Chambre" },
            { label: "Terrasse" },
            { label: "Façade" },
          ].map((p) => (
            <div key={p.label} className="bg-[#d4a96a]/30 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#c8813a]/20 to-[#8aab94]/30 flex items-center justify-center">
                <span className="text-[#3a3d42]/40 text-sm">{p.label}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#8aab94] mt-4">
          Placez vos photos dans{" "}
          <code className="bg-[#e8e6e1] px-1 rounded">/public/photos/</code>
        </p>
      </div>
    </section>
  );
}
