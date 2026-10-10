import { cache } from "react";
import { getDb } from "./db";
import { DEFAULT_SETTINGS, getSettings, type SiteSettings } from "./settings";

// Réglages du site pour les composants serveur — une seule requête par rendu,
// valeurs par défaut si la base est injoignable.
export const loadSettings = cache(async (): Promise<SiteSettings> => {
  if (!process.env.DATABASE_URL) return DEFAULT_SETTINGS;
  try {
    return await getSettings(getDb());
  } catch {
    return DEFAULT_SETTINGS;
  }
});
