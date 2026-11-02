import type { NeonQueryFunction } from "@neondatabase/serverless";

export interface SiteSettings {
  prix_nuit: number;
  frais_menage: number;
  majoration_weekend: number;
  reduc_semaine: number;
  reduc_mois: number;
  caution: number;
  cadeau_direct: string;
  ts_taux: number;
  ts_plafond: number;
  ts_majoration: number;
  seuil_caution_nuits: number;
  numero_enregistrement: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  prix_nuit: 75,
  frais_menage: 0,
  majoration_weekend: 5,
  reduc_semaine: 10,
  reduc_mois: 30,
  caution: 300,
  cadeau_direct: "",
  ts_taux: 0.05,
  ts_plafond: 3.64,
  ts_majoration: 0.1,
  seuil_caution_nuits: 5,
  numero_enregistrement: "",
};

export const NUMERIC_SETTING_KEYS = [
  "prix_nuit",
  "frais_menage",
  "majoration_weekend",
  "reduc_semaine",
  "reduc_mois",
  "caution",
  "ts_taux",
  "ts_plafond",
  "ts_majoration",
  "seuil_caution_nuits",
] as const;

export const TEXT_SETTING_KEYS = ["cadeau_direct", "numero_enregistrement"] as const;

function toNumber(raw: string | undefined, fallback: number): number {
  if (raw == null || raw.trim() === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export async function getSettings(sql: NeonQueryFunction<false, false>): Promise<SiteSettings> {
  try {
    const rows = await sql`SELECT key, value FROM settings`;
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;

    const settings: SiteSettings = { ...DEFAULT_SETTINGS };
    for (const key of NUMERIC_SETTING_KEYS) settings[key] = toNumber(map[key], DEFAULT_SETTINGS[key]);
    for (const key of TEXT_SETTING_KEYS) settings[key] = map[key] ?? DEFAULT_SETTINGS[key];
    return settings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
