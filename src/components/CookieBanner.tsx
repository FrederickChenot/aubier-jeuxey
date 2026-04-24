"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#3a3d42] border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#b8cfc0]">
          Ce site utilise des cookies pour mesurer l&apos;audience et améliorer votre expérience.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-sm text-[#8aab94] hover:text-[#f7f5f0] px-4 py-2 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="text-sm bg-[#c8813a] hover:bg-[#e8b87a] text-white px-4 py-2 rounded transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
