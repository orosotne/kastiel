import HeroSection from "@/components/sections/HeroSection";
import PhoenixSection from "@/components/sections/PhoenixSection";
import MediaSection from "@/components/sections/MediaSection";
import ChronicleSection from "@/components/sections/ChronicleSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ParkSection from "@/components/sections/ParkSection";
import StructuredData from "@/components/StructuredData";

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


