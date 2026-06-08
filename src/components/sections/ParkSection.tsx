"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export default function ParkSection() {
  const t = useTranslations("park");

  return (
    <section className="bg-cream">
      {/* Park Life Block */}
      <div className="py-24 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <FadeInOnScroll direction="left">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/images/park-alpacas.webp"
                  alt={t("alt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[25%_35%]"
                />
              </div>
            </FadeInOnScroll>

            {/* Content */}
            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="space-y-6">
                <SectionEyebrow label={t("label")} align="left" />
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  {t("title")}
                </h2>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {t("description")}
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      {/* DOČASNE SKRYTÉ - Wine Cellar Block
      <div className="py-32 md:py-48 bg-gradient-to-br from-charcoal via-slate-castle to-charcoal relative overflow-hidden">
        <div className="container-custom">
          <FadeInOnScroll className="max-w-2xl">
            <div className="bg-charcoal/80 backdrop-blur-sm p-8 md:p-12">
              <SectionEyebrow label="Underground" align="left" className="mb-6" />
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                {t("cellar.title")}
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                {t("cellar.description")}
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
      */}
    </section>
  );
}


