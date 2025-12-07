import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Kaštieľ Bošany - In Integrum",
  description: "Kontaktujte nás ohľadom svadby, firemnej akcie alebo návštevy kaštieľa Bošany. Adresa: SNP 113/1, 956 18 Bošany. Tel: +421 907 726 726.",
  keywords: [
    "kontakt kaštieľ Bošany",
    "In Integrum kontakt",
    "rezervácia svadby",
    "obhliadka kaštieľa",
    "Bošany adresa",
    "svadobná lokalita kontakt"
  ],
  openGraph: {
    title: "Kontakt | Kaštieľ Bošany",
    description: "Spojte sa s nami. Dohodnite si nezáväznú obhliadku kaštieľa.",
    images: ["/images/contact-hero.jpeg"],
  },
  alternates: {
    canonical: "https://inintegrum.sk/sk/kontakt",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

