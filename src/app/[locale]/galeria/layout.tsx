import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fotogaléria Kaštieľa Bošany | Priestory a podujatia",
  description: "Prehliadnite si fotografie renesančného kaštieľa Bošany. Interiéry, exteriéry, svadobné priestory a atmosféra historickej pamiatky.",
  keywords: [
    "fotogaléria kaštieľ Bošany",
    "interiér kaštieľa",
    "svadobné priestory fotky",
    "renesančné interiéry",
    "historická pamiatka fotografie",
    "kaštieľ Slovensko fotky"
  ],
  openGraph: {
    title: "Fotogaléria Kaštieľa Bošany | Priestory a atmosféra",
    description: "Objavte krásu renesančného kaštieľa cez objektív. Interiéry, exteriéry a atmosféra histórie.",
    images: ["/images/gallery-hero.jpeg"],
  },
  alternates: {
    canonical: "https://inintegrum.sk/sk/galeria",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

