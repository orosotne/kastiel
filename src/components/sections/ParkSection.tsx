"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";

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
                  src="/images/park-alpacas.jpeg"
                  alt="Alpaky v parku"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeInOnScroll>

            {/* Content */}
            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-gold" />
                  <span className="text-sm uppercase tracking-[0.2em] text-gold">
                    Estate
                  </span>
                </div>
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
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-sm uppercase tracking-[0.2em] text-gold">
                  Underground
                </span>
              </div>
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


