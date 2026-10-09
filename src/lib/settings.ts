import { NeonQueryFunction } from "@neondatabase/serverless";

export interface SiteSettings {
  prix_nuit: number;
  frais_menage: number;
  caution: number;
  cadeau_direct: string;
}

const DEFAULT_CADEAU_DIRECT = "Panier d'accueil vosgien offert";

export async function getSettings(sql: NeonQueryFunction<false, false>): Promise<SiteSettings> {
  try {
    const rows = await sql`SELECT key, value FROM settings`;
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return {
      prix_nuit: Number(map.prix_nuit ?? 75),
      frais_menage: Number(map.frais_menage ?? 40),
      caution: Number(map.caution ?? 300),
      cadeau_direct: map.cadeau_direct ?? DEFAULT_CADEAU_DIRECT,
    };
  } catch {
    return { prix_nuit: 75, frais_menage: 40, caution: 300, cadeau_direct: DEFAULT_CADEAU_DIRECT };
  }
}
