import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface LegalArticle {
  title: string;
  content: ReactNode;
}

// Gabarit commun des pages d'information (règlement, conditions, mentions légales, confidentialité).
export default function LegalPage({
  title,
  subtitle,
  articles,
  footnote,
}: {
  title: string;
  subtitle: string;
  articles: LegalArticle[];
  footnote?: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#f7f5f0]">
        <div className="bg-[#3a3d42] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl italic text-[#f7f5f0] mb-2">
              {title}
            </h1>
            <p className="text-[#8aab94]">{subtitle}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 border border-[#b8cfc0]/30 space-y-6">
            {articles.map((a, i) => (
              <div key={a.title} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#c8813a] text-white text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h2 className="font-medium text-[#3a3d42] text-sm mb-1">{a.title}</h2>
                  <div className="text-[#3a3d42]/80 text-sm leading-6 space-y-2">{a.content}</div>
                </div>
              </div>
            ))}
          </div>

          {footnote && <p className="mt-6 text-xs text-[#8aab94] text-center">{footnote}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
