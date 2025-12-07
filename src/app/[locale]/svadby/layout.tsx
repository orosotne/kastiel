import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Svadby v Kaštieli Bošany | Romantická svadobná lokalita",
  description: "Usporiadajte svoju svadbu v renesančnom kaštieli Bošany. Rozprávkové prostredie s alpakami, historický park, kapacita do 150 hostí. Kontaktujte nás pre nezáväznú obhliadku.",
  keywords: [
    "svadba v kaštieli",
    "svadobná lokalita Slovensko",
    "renesančná svadba",
    "romantická svadba",
    "kaštieľ Bošany svadba",
    "svadobný priestor Topoľčany",
    "svadba s alpakami",
    "historická svadobná lokalita"
  ],
  openGraph: {
    title: "Svadby v Kaštieli Bošany | Rozprávková svadobná lokalita",
    description: "Váš veľký deň v prostredí renesančného kaštieľa. Alpaky, historický park, unikátna atmosféra.",
    images: ["/images/wedding-hero.png"],
  },
  alternates: {
    canonical: "https://inintegrum.sk/sk/svadby",
  },
};

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

