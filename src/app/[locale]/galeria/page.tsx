"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import ParallaxSection from "@/components/interactive/ParallaxSection";
import { Users, Projector, Wifi, UtensilsCrossed, Wine, Calendar } from "lucide-react";

export default function GalleryPage() {
  const t = useTranslations("gallery");

  const conferenceFeatures = [
    { icon: Users, label: t("conference.features.capacity") },
    { icon: Projector, label: t("conference.features.tech") },
    { icon: UtensilsCrossed, label: t("conference.features.catering") },
  ];

  const events = [
    { date: "15. Dec 2024", title: "Vianočný koncert", type: "Koncert" },
    { date: "20. Dec 2024", title: "Výstava lokálnych umelcov", type: "Vernisáž" },
    { date: "31. Dec 2024", title: "Silvestrovská oslava", type: "Event" },
    { date: "10. Jan 2025", title: "Novoročná degustácia vín", type: "Degustácia" },
  ];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/gallery-hero.jpg"
      />

      {/* Conference Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInOnScroll direction="left">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/conference-room.jpg"
                    alt="Konferenčná sála"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold -z-10" />
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-gold" />
                  <span className="text-sm uppercase tracking-[0.2em] text-gold">
                    Business
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  {t("conference.title")}
                </h2>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {t("conference.description")}
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  {conferenceFeatures.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div key={i} className="text-center p-4 bg-white">
                        <Icon className="text-gold mx-auto mb-2" size={28} />
                        <span className="text-xs text-charcoal/60">
                          {feature.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                Kultúra
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t("culture.title")}
            </h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto">
              {t("culture.description")}
            </p>
          </FadeInOnScroll>

          {/* Events Calendar */}
          <FadeInOnScroll delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-gold" size={24} />
                <h3 className="font-serif text-xl text-charcoal">
                  Najbližšie podujatia
                </h3>
              </div>

              <div className="space-y-4">
                {events.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-6 bg-cream hover:bg-cream-200 transition-colors duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-gold font-medium w-24">
                        {event.date}
                      </span>
                      <div>
                        <h4 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-300">
                          {event.title}
                        </h4>
                        <span className="text-xs text-charcoal/50 uppercase tracking-wider">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Wine Cellar Section */}
      <ParallaxSection
        backgroundImage="/images/wine-cellar-large.jpg"
        speed={0.3}
        className="py-32 md:py-48"
      >
        <div className="container-custom">
          <FadeInOnScroll className="max-w-2xl mx-auto text-center">
            <div className="bg-charcoal/85 backdrop-blur-sm p-10 md:p-16">
              <Wine className="text-gold mx-auto mb-6" size={48} />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                {t("cellar.title")}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {t("cellar.description")}
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </ParallaxSection>

      {/* Gallery Grid */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Fotogaléria
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FadeInOnScroll key={i} delay={i * 0.05}>
                <div
                  className={`relative overflow-hidden group cursor-pointer ${
                    i === 1 || i === 6 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={`/images/gallery/interior-${i}.jpg`}
                      alt={`Interiér ${i}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300" />
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}



