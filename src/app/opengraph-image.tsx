import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "L'Aubier — Studio · Jeuxey · Vosges";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontsDir = join(process.cwd(), "assets", "fonts");
  const [playfairItalic, dmSans] = await Promise.all([
    readFile(join(fontsDir, "PlayfairDisplay-Italic.ttf")),
    readFile(join(fontsDir, "DMSans-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#3a3d42",
          borderTop: "8px solid #c8813a",
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display",
            fontStyle: "italic",
            fontSize: 150,
            color: "#f7f5f0",
          }}
        >
          L&apos;Aubier
        </div>
        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: 40,
            letterSpacing: 6,
            color: "#b8cfc0",
            marginTop: 28,
          }}
        >
          Studio · Jeuxey · Vosges
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: playfairItalic, style: "italic", weight: 400 },
        { name: "DM Sans", data: dmSans, style: "normal", weight: 400 },
      ],
    }
  );
}
