export default function MapEmbed() {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8369476573494!2d6.485419276726074!3d48.19465244718566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4793a04aed5ddbb5%3A0x459dec8b31c1f8c6!2s44a%20Rue%20d&#39;Epinal%2C%2088000%20Jeuxey!5e1!3m2!1sfr!2sfr!4v1778617475032!5m2!1sfr!2sfr"
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
