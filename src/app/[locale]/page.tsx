import HeroSection from "@/components/sections/HeroSection";
import PhoenixSection from "@/components/sections/PhoenixSection";
import MediaSection from "@/components/sections/MediaSection";
import ChronicleSection from "@/components/sections/ChronicleSection";
// import ServicesSection from "@/components/sections/ServicesSection"; // DOČASNE SKRYTÉ
import ParkSection from "@/components/sections/ParkSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhoenixSection />
      <MediaSection />
      <ChronicleSection />
      {/* <ServicesSection /> DOČASNE SKRYTÉ */}
      <ParkSection />
    </>
  );
}


