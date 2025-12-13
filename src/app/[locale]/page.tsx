import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import StructuredData from "@/components/StructuredData";

// Lazy load sections below the fold for better initial load
const PhoenixSection = dynamic(() => import("@/components/sections/PhoenixSection"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const MediaSection = dynamic(() => import("@/components/sections/MediaSection"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const ChronicleSection = dynamic(() => import("@/components/sections/ChronicleSection"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const ParkSection = dynamic(() => import("@/components/sections/ParkSection"), {
  loading: () => <div className="min-h-[50vh]" />,
});

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <HeroSection />
      <PhoenixSection />
      <MediaSection />
      <ChronicleSection />
      <ServicesSection />
      <ParkSection />
    </>
  );
}


