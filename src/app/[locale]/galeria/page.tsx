"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import ParallaxSection from "@/components/interactive/ParallaxSection";
import { Users, Projector, Wifi, UtensilsCrossed, Wine, Calendar, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Zoznam všetkých fotiek interiéru
const interiorPhotos = [
  { src: "/images/gallery/interior-1.jpeg", alt: "Interiér kaštieľa 1" },
  { src: "/images/gallery/interior-2.jpg", alt: "Interiér kaštieľa 2" },
  { src: "/images/gallery/interior-3.png", alt: "Interiér kaštieľa 3" },
  { src: "/images/gallery/interior-4.jpg", alt: "Interiér kaštieľa 4" },
  { src: "/images/gallery/interior-5.jpg", alt: "Interiér kaštieľa 5" },
  { src: "/images/gallery/interior-6.jpg", alt: "Interiér kaštieľa 6" },
  { src: "/images/gallery/interior-7.jpg", alt: "Interiér kaštieľa 7" },
  { src: "/images/gallery/interior-8.jpg", alt: "Interiér kaštieľa 8" },
  { src: "/images/gallery/interior-9.jpg", alt: "Interiér kaštieľa 9" },
  { src: "/images/gallery/interior-10.jpg", alt: "Interiér kaštieľa 10" },
  { src: "/images/gallery/interior-11.jpg", alt: "Interiér kaštieľa 11" },
  { src: "/images/gallery/interior-12.jpg", alt: "Interiér kaštieľa 12" },
  { src: "/images/gallery/interior-13.jpg", alt: "Interiér kaštieľa 13" },
  { src: "/images/gallery/interior-14.jpg", alt: "Interiér kaštieľa 14" },
  { src: "/images/gallery/interior-15.jpg", alt: "Interiér kaštieľa 15" },
  { src: "/images/gallery/interior-16.jpg", alt: "Interiér kaštieľa 16" },
  { src: "/images/gallery/interior-17.jpg", alt: "Interiér kaštieľa 17" },
  { src: "/images/gallery/interior-18.jpg", alt: "Interiér kaštieľa 18" },
  { src: "/images/gallery/interior-19.jpg", alt: "Interiér kaštieľa 19" },
  { src: "/images/gallery/interior-20.jpg", alt: "Interiér kaštieľa 20" },
  { src: "/images/gallery/interior-21.jpg", alt: "Interiér kaštieľa 21" },
  { src: "/images/gallery/interior-22.jpg", alt: "Interiér kaštieľa 22" },
  { src: "/images/gallery/interior-23.jpg", alt: "Interiér kaštieľa 23" },
  { src: "/images/gallery/interior-24.jpg", alt: "Interiér kaštieľa 24" },
  { src: "/images/gallery/interior-25.jpg", alt: "Interiér kaštieľa 25" },
  { src: "/images/gallery/interior-26.jpg", alt: "Interiér kaštieľa 26" },
  { src: "/images/gallery/interior-27.jpg", alt: "Interiér kaštieľa 27" },
  { src: "/images/gallery/interior-28.jpg", alt: "Interiér kaštieľa 28" },
  { src: "/images/gallery/interior-29.jpg", alt: "Interiér kaštieľa 29" },
  { src: "/images/gallery/interior-30.jpg", alt: "Interiér kaštieľa 30" },
  { src: "/images/gallery/interior-31.jpg", alt: "Interiér kaštieľa 31" },
  { src: "/images/gallery/interior-32.jpg", alt: "Interiér kaštieľa 32" },
  { src: "/images/gallery/interior-33.jpg", alt: "Interiér kaštieľa 33" },
];

const INITIAL_COUNT = 8;

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedPhotos = showAll ? interiorPhotos : interiorPhotos.slice(0, INITIAL_COUNT);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? interiorPhotos.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === interiorPhotos.length - 1 ? 0 : prev + 1));

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
        backgroundImage="/images/gallery-hero.jpeg"
      />

      {/* Conference Section - DOČASNE SKRYTÉ
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
      */}

      {/* Culture Section - DOČASNE SKRYTÉ
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
      */}

      {/* Wine Cellar Section - DOČASNE SKRYTÉ
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
      */}

      {/* Gallery Grid */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Fotogaléria
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
              Prezrite si interiéry a priestory nášho renesančného kaštieľa
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedPhotos.map((photo, i) => (
              <FadeInOnScroll key={i} delay={i * 0.03}>
                <div
                  onClick={() => openLightbox(showAll ? i : i)}
                  className={`relative overflow-hidden group cursor-pointer ${
                    i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>

          {/* Show More Button */}
          {!showAll && interiorPhotos.length > INITIAL_COUNT && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 bg-gold/20 hover:bg-gold text-gold hover:text-charcoal px-8 py-3 rounded-full transition-all duration-300 font-medium uppercase tracking-wider text-sm cursor-pointer"
              >
                Zobraziť všetky fotky ({interiorPhotos.length})
              </button>
            </motion.div>
          )}

          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 bg-charcoal/10 hover:bg-charcoal text-charcoal hover:text-white px-8 py-3 rounded-full transition-all duration-300 font-medium uppercase tracking-wider text-sm cursor-pointer"
              >
                Zobraziť menej
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronRight size={48} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={interiorPhotos[currentIndex].src}
                alt={interiorPhotos[currentIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {interiorPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



