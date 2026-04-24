"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/logement", label: "Le logement" },
  { href: "/disponibilites", label: "Disponibilités" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#3a3d42]/95 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-xl italic text-[#f7f5f0]">
          L&apos;Aubier
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#b8cfc0] hover:text-[#f7f5f0] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="bg-[#c8813a] hover:bg-[#e8b87a] text-white text-sm font-medium px-4 py-2 rounded transition-colors"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#f7f5f0] p-2"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#3a3d42] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#b8cfc0] hover:text-[#f7f5f0] text-sm"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="bg-[#c8813a] text-white text-sm font-medium px-4 py-2 rounded text-center"
            onClick={() => setOpen(false)}
          >
            Réserver
          </Link>
        </div>
      )}
    </header>
  );
}
