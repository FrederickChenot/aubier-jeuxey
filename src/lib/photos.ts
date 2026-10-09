import { readdirSync } from "fs";
import path from "path";

const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export interface Photo {
  src: string;
  alt: string;
}

function toAlt(filename: string): string {
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const withoutPrefix = withoutExt.replace(/^\d+[-_]/, "");
  const words = withoutPrefix.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function getPhotos(): Photo[] {
  let files: string[];
  try {
    files = readdirSync(PHOTOS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => ({ src: `/photos/${f}`, alt: toAlt(f) }));
}
