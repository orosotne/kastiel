"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { Clock, Building, Star, Hammer } from "lucide-react";

const timelineEvents = [
  {
    year: "1550",
    icon: Building,
    titleKey: "gothic",
    descKey: "gothicDesc",
  },
  {
    year: "1600",
    icon: Star,
    titleKey: "renaissance",
    descKey: "renaissanceDesc",
  },
  {
    year: "1770",
    icon: Clock,
    titleKey: "maria",
    descKey: "mariaDesc",
  },
  {
    year: "2007",
    icon: Hammer,
    titleKey: "restoration",
    descKey: "restorationDesc",
  },
];

export default function StoryPage() {
  const t = useTranslations("story");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/story-hero.jpg"
      />

      {/* Timeline Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t("timeline.title")}
            </h2>
          </FadeInOnScroll>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gold/30 hidden md:block" />

            {/* Events */}
            <div className="space-y-16 md:space-y-24">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isEven = index % 2 === 0;

                return (
                  <FadeInOnScroll
                    key={event.year}
                    delay={index * 0.1}
                    direction={isEven ? "left" : "right"}
                  >
                    <div
                      className={`flex flex-col md:flex-row items-center gap-8 ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Content */}
                      <div
                        className={`flex-1 ${
                          isEven ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <span className="font-serif text-5xl md:text-6xl text-gold/30">
                          {event.year}
                        </span>
                        <h3 className="font-serif text-2xl text-charcoal mt-2 mb-3">
                          {event.titleKey === "gothic" && "Gotické základy"}
                          {event.titleKey === "renaissance" && "Renesančná prestavba"}
                          {event.titleKey === "maria" && "Návšteva Márie Terézie"}
                          {event.titleKey === "restoration" && "Začiatok obnovy"}
                        </h3>
                        <p className="text-charcoal/70">
                          {event.titleKey === "gothic" &&
                            "Po tureckých nájazdoch vzniká opevnený kaštieľ s gotickými prvkami."}
                          {event.titleKey === "renaissance" &&
                            "Kaštieľ získava charakteristické polygonálne veže a renesančnú podobu."}
                          {event.titleKey === "maria" &&
                            "Cisárovná Mária Terézia prenocovala v kaštieli počas svojej cesty."}
                          {event.titleKey === "restoration" &&
                            "Začína 17-ročná cesta záchrany a obnovy kaštieľa z ruín."}
                        </p>
                      </div>

                      {/* Icon */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg">
                          <Icon size={28} className="text-charcoal" />
                        </div>
                      </div>

                      {/* Spacer for alignment */}
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </FadeInOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInOnScroll direction="left">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/thick-walls.jpg"
                  alt="Hrubé múry kaštieľa"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-gold" />
                  <span className="text-sm uppercase tracking-[0.2em] text-gold">
                    Filozofia
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  {t("philosophy.title")}
                </h2>
                <h3 className="font-serif text-xl text-gold">
                  {t("philosophy.subtitle")}
                </h3>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {t("philosophy.description")}
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center p-6 bg-cream">
                    <span className="font-serif text-4xl text-gold">1m</span>
                    <p className="text-sm text-charcoal/60 mt-2">Hrúbka múrov</p>
                  </div>
                  <div className="text-center p-6 bg-cream">
                    <span className="font-serif text-4xl text-gold">17</span>
                    <p className="text-sm text-charcoal/60 mt-2">Rokov obnovy</p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Analytická sonda
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
              Fotografie odhaleného muriva a originálnych prvkov kaštieľa
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="relative aspect-square overflow-hidden group">
                  <Image
                    src={`/images/gallery/analysis-${i}.jpg`}
                    alt={`Analytická sonda ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}



