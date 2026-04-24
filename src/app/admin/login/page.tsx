"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push("/admin");
    }
  }

  return (
    <main className="min-h-screen bg-[#3a3d42] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#f7f5f0] text-center mb-8">
          L&apos;Aubier · Admin
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[#8aab94] block mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[#b8cfc0] rounded-lg px-3 py-2 text-sm text-[#3a3d42] focus:outline-none focus:ring-2 focus:ring-[#c8813a]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c8813a] hover:bg-[#e8b87a] disabled:opacity-40 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
