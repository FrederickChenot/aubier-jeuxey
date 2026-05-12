export default function MapEmbed() {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5353.0!2d6.4097!3d48.1847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4792769b7b7b7b7b%3A0x7b7b7b7b7b7b7b7b!2sJeuxey%2C%2088340%20Vosges!5e0!3m2!1sfr!2sfr"
        width="100%"
        className="h-[280px] md:h-[420px] w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation de L'Aubier — Jeuxey, Vosges"
      />
    </div>
  );
}
