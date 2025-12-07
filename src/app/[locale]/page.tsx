import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

// Lazy load komponenty pod fold pre rýchlejšie First Contentful Paint
const PhoenixSection = dynamic(() => import("@/components/sections/PhoenixSection"), {
  loading: () => <div className="h-96 bg-cream animate-pulse" />,
});
const MediaSection = dynamic(() => import("@/components/sections/MediaSection"), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});
const ChronicleSection = dynamic(() => import("@/components/sections/ChronicleSection"), {
  loading: () => <div className="h-96 bg-cream animate-pulse" />,
});
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), {
  loading: () => <div className="h-96 bg-charcoal animate-pulse" />,
});
const ParkSection = dynamic(() => import("@/components/sections/ParkSection"), {
  loading: () => <div className="h-96 bg-renaissance-green animate-pulse" />,
});

export const metadata: Metadata = {
  title: "Kaštieľ Bošany | Renesančná svadobná lokalita na Slovensku",
  description: "Objavte renesančný kaštieľ Bošany - historickú pamiatku z 16. storočia. Ideálne miesto pre svadby, firemné akcie a kultúrne podujatia. 17 rokov obnovy, unikátna atmosféra.",
  openGraph: {
    title: "Kaštieľ Bošany | Renesančná svadobná lokalita",
    description: "Renesančný kaštieľ z 16. storočia - svadby, firemné akcie, kultúra. Kde sa história vracia do života.",
    images: ["/images/Hero_image.jpeg"],
  },
  alternates: {
    canonical: "https://inintegrum.sk",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhoenixSection />
      <MediaSection />
      <ChronicleSection />
      <ServicesSection />
      <ParkSection />
    </>
  );
}


