import Link from "next/link";
import { loadSettings } from "@/lib/loadSettings";

export default async function Footer() {
  const { numero_enregistrement } = await loadSettings();

  return (
    <footer className="bg-[#3a3d42] text-[#b8cfc0] py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="font-[family-name:var(--font-playfair)] text-lg italic text-[#f7f5f0] mb-2">
            L&apos;Aubier
          </p>
          <p className="text-sm">Studio design · Jeuxey · Vosges</p>
          <p className="text-sm mt-1">Rénovation 2025</p>
          {numero_enregistrement && (
            <p className="text-xs text-[#8aab94] mt-3">
              Meublé de tourisme — n° d&apos;enregistrement : {numero_enregistrement}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-3">Navigation</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/logement" className="hover:text-[#f7f5f0] transition-colors">Le logement</Link></li>
            <li><Link href="/disponibilites" className="hover:text-[#f7f5f0] transition-colors">Disponibilités</Link></li>
            <li><Link href="/reservation" className="hover:text-[#f7f5f0] transition-colors">Réserver</Link></li>
            <li><Link href="/blog" className="hover:text-[#f7f5f0] transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-3">Informations</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/reglement" className="hover:text-[#f7f5f0] transition-colors">Règlement intérieur</Link></li>
            <li><Link href="/conditions" className="hover:text-[#f7f5f0] transition-colors">Conditions de réservation</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-[#f7f5f0] transition-colors">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-[#f7f5f0] transition-colors">Confidentialité</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#8aab94] mb-3">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:contact@aubier-vosges.fr" className="hover:text-[#f7f5f0] transition-colors">
                contact@aubier-vosges.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#8aab94]">
        <p>© {new Date().getFullYear()} L&apos;Aubier — Tous droits réservés</p>
        <p>
          L&apos;aubier est la partie vivante du bois, entre écorce et cœur.
        </p>
      </div>
    </footer>
  );
}
