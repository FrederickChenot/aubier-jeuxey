import generated from "@/generated/photos.json";

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Liste produite au build par scripts/gen-photos.mjs — aucun accès disque au rendu.
export const photos: Photo[] = generated;
