export default function MapEmbed() {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676!2d6.4097!3d48.1833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479276bfb1234567%3A0xabcdef123456!2s44A+Rue+d%27%C3%89pinal%2C+88000+Jeuxey%2C+France!5e0!3m2!1sfr!2sfr!4v1715000000000"
        width="100%"
        className="h-[280px] md:h-[420px] w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="L'Aubier — 44a Rue d'Épinal, 88000 Jeuxey"
      />
    </div>
  );
}
