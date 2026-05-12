"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/reservations", label: "Réservations" },
  { href: "/admin/disponibilites", label: "Disponibilités" },
  { href: "/admin/parametres", label: "Paramètres" },
  { href: "/reglement", label: "Règlement" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-[#3a3d42] flex-col fixed left-0 top-0 h-screen z-10">
        <div className="px-5 py-6 border-b border-white/10">
          <p className="font-[family-name:var(--font-playfair)] text-lg italic text-[#f7f5f0]">L&apos;Aubier</p>
          <p className="text-xs text-[#8aab94] mt-0.5">Administration</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[#c8813a] text-white"
                    : "text-[#b8cfc0] hover:text-[#f7f5f0] hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-[#8aab94] hover:text-[#f7f5f0] transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden bg-[#3a3d42] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <p className="font-[family-name:var(--font-playfair)] text-base italic text-[#f7f5f0]">L&apos;Aubier · Admin</p>
        <nav className="flex gap-3 text-xs text-[#b8cfc0]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "text-[#c8813a]" : "hover:text-[#f7f5f0]"}
            >
              {item.label.split(" ")[0]}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
