interface Props {
  cadeauDirect: string;
}

export default function WhyDirect({ cadeauDirect }: Props) {
  const thirdCard = cadeauDirect
    ? {
        icon: "🎁",
        title: "Un cadeau de bienvenue",
        desc: `${cadeauDirect} pour toute réservation sur le site.`,
      }
    : {
        icon: "✉️",
        title: "Réservation simple",
        desc: "Réponse sous 48h par email.",
      };

  const reasons = [
    {
      icon: "📞",
      title: "Contact direct avec le propriétaire",
      desc: "Chaque demande est étudiée personnellement.",
    },
    {
      icon: "🕐",
      title: "Départ tardif possible",
      desc: "Jusqu'à 12h si le logement n'est pas reloué le jour même, sur demande.",
    },
    thirdCard,
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#3a3d42] mb-2 text-center">
          Pourquoi réserver en direct ?
        </h2>
        <p className="text-[#8aab94] text-sm text-center mb-10">
          Le même logement, le même confort, une relation directe
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="text-center p-6">
              <p className="text-4xl mb-3">{r.icon}</p>
              <p className="font-medium text-[#3a3d42] mb-2">{r.title}</p>
              <p className="text-sm text-[#8aab94]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
