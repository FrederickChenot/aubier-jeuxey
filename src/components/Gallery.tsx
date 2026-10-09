import { getPhotos } from "@/lib/photos";
import GalleryGrid from "./GalleryGrid";

export default function Gallery({ title = "Le logement" }: { title?: string }) {
  const photos = getPhotos();
  if (photos.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic text-[#3a3d42] mb-8 text-center">
          {title}
        </h2>
        <GalleryGrid photos={photos} />
      </div>
    </section>
  );
}
