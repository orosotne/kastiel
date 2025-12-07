import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Príbeh Kaštieľa Bošany | 500 rokov histórie",
  description: "Objavte fascinujúcu históriu kaštieľa Bošany od 16. storočia. Rod Bošániovcov, Adolf Schmitt, 17 rokov obnovy. Historické fotografie a unikátne príbehy.",
  keywords: [
    "história kaštieľa Bošany",
    "rod Bošániovcov",
    "Adolf Schmitt",
    "renesančná architektúra",
    "obnova pamiatky",
    "historické fotografie",
    "Slovensko história",
    "16. storočie kaštieľ"
  ],
  openGraph: {
    title: "Príbeh Kaštieľa Bošany | Päť storočí histórie",
    description: "Od renesančnej slávy po ruinu a späť. 17 rokov obnovy jedinečnej pamiatky.",
    images: ["/images/story-hero.jpeg"],
  },
  alternates: {
    canonical: "https://inintegrum.sk/sk/pribeh",
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

