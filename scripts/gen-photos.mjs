import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { imageSize } from "image-size";

// Fige la liste des photos au build : sur Vercel, public/ n'est pas embarqué dans les
// fonctions serverless, donc aucune lecture de dossier ne doit avoir lieu au rendu.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PHOTOS_DIR = path.join(ROOT, "public", "photos");
const OUT_FILE = path.join(ROOT, "src", "generated", "photos.json");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function toAlt(filename) {
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const withoutPrefix = withoutExt.replace(/^\d+[-_]/, "");
  const words = withoutPrefix.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const files = existsSync(PHOTOS_DIR)
  ? readdirSync(PHOTOS_DIR)
      .filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }))
  : [];

const photos = files.map((f) => {
  const { width, height, orientation } = imageSize(readFileSync(path.join(PHOTOS_DIR, f)));
  // Orientations EXIF 5 à 8 : l'image est affichée tournée d'un quart de tour.
  const rotated = orientation != null && orientation >= 5;
  return {
    src: `/photos/${f}`,
    alt: toAlt(f),
    width: rotated ? height : width,
    height: rotated ? width : height,
  };
});

mkdirSync(path.dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(photos, null, 2) + "\n");

if (photos.length === 0) {
  console.warn("gen-photos : aucune photo trouvée dans public/photos — la galerie sera masquée.");
} else {
  console.log(`gen-photos : ${photos.length} photo(s) → src/generated/photos.json`);
}
