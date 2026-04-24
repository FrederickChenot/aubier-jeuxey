import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#3a3d42] flex items-center justify-center text-center px-4">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a3d42] via-[#3a3d42]/90 to-[#3a3d42]/70" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-block mb-8 px-4 py-2 bg-[#c8813a]/20 border border-[#c8813a]/40 rounded-full">
          <p className="text-[#e8b87a] text-sm font-medium">
            Réservez sans frais de plateforme — économisez 15%
          </p>
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-[#f7f5f0] leading-tight mb-4">
          <span className="italic">L&apos;Aubier</span>
        </h1>

        <p className="text-[#8aab94] text-xl md:text-2xl mb-2 tracking-wide">
          Studio design · Jeuxey · Vosges
        </p>

        <p className="text-[#b8cfc0]/70 text-sm mb-10 max-w-md mx-auto">
          Entièrement rénové en 2025. Au cœur de la nature vosgienne.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/reservation"
            className="bg-[#c8813a] hover:bg-[#e8b87a] text-white font-medium px-8 py-3 rounded transition-colors text-sm"
          >
            Réserver maintenant
          </Link>
          <Link
            href="/logement"
            className="border border-[#8aab94]/50 hover:border-[#8aab94] text-[#b8cfc0] hover:text-[#f7f5f0] font-medium px-8 py-3 rounded transition-colors text-sm"
          >
            Voir le logement
          </Link>
        </div>

        {/* Key stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div>
            <p className="text-[#c8813a] text-2xl font-medium">75€</p>
            <p className="text-[#8aab94] text-xs">la nuit</p>
          </div>
          <div className="border-x border-white/10">
            <p className="text-[#c8813a] text-2xl font-medium">2</p>
            <p className="text-[#8aab94] text-xs">voyageurs</p>
          </div>
          <div>
            <p className="text-[#c8813a] text-2xl font-medium">2025</p>
            <p className="text-[#8aab94] text-xs">rénovation</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#8aab94]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
