"use client";

import { useState } from "react";

// La carte n'est chargée qu'à la demande : aucun appel à Google tant que le visiteur ne clique pas.
export default function MapEmbed() {
  const [shown, setShown] = useState(false);

  if (!shown) {
    return (
      <div className="w-full h-[280px] md:h-[420px] rounded-xl bg-[#b8cfc0]/30 border border-[#b8cfc0]/60 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-[#3a3d42]">44a Rue d&apos;Épinal, 88000 Jeuxey</p>
        <button
          onClick={() => setShown(true)}
          className="bg-[#c8813a] hover:bg-[#e8b87a] text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Afficher la carte (Google Maps)
        </button>
        <p className="text-xs text-[#8aab94] max-w-sm">
          L&apos;affichage de la carte transmet des données à Google (adresse IP, cookies).
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8369476573494!2d6.485419276726074!3d48.19465244718566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4793a04aed5ddbb5%3A0x459dec8b31c1f8c6!2s44a%20Rue%20d&#39;Epinal%2C%2088000%20Jeuxey!5e1!3m2!1sfr!2sfr!4v1778617475032!5m2!1sfr!2sfr"
        width="100%"
        className="h-[280px] md:h-[420px] w-full border-0"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="L'Aubier — 44a Rue d'Épinal, 88000 Jeuxey"
      />
    </div>
  );
}
