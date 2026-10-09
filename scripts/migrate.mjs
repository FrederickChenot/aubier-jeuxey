import { existsSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

function loadEnvLocal() {
  if (process.env.DATABASE_URL) return;
  const envPath = fileURLToPath(new URL("../.env.local", import.meta.url));
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) process.env[match[1]] ??= match[2].trim();
  }
}

loadEnvLocal();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL non défini (ni dans l'environnement, ni dans .env.local).");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function main() {
  await sql`ALTER TABLE blocked_dates ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'manual'`;
  await sql`ALTER TABLE blocked_dates ADD COLUMN IF NOT EXISTS external_uid TEXT`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_blocked_dates_source_uid ON blocked_dates (source, external_uid)`;
  console.log("Migration OK — blocked_dates.source / external_uid prêtes.");
}

main().catch((err) => {
  console.error("Migration échouée :", err);
  process.exit(1);
});
