import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import StructuredData from "@/components/StructuredData";
import { buildAlternates } from "@/lib/metadata";

// Lazy load sections below the fold for better initial load

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    alternates: buildAlternates(locale, ""),
  };
}
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

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
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


