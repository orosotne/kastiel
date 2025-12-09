"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Zoznam všetkých interior fotiek so správnymi príponami
const interiorPhotos = [
  "/images/gallery/interior-1.jpeg",
  "/images/gallery/interior-2.jpg",
  "/images/gallery/interior-3.png",
  "/images/gallery/interior-4.jpg",
  "/images/gallery/interior-5.jpg",
  "/images/gallery/interior-6.jpg",
  "/images/gallery/interior-7.jpg",
  "/images/gallery/interior-8.jpg",
  "/images/gallery/interior-9.jpg",
  "/images/gallery/interior-10.jpg",
  "/images/gallery/interior-11.jpg",
  "/images/gallery/interior-12.jpg",
  "/images/gallery/interior-13.jpg",
  "/images/gallery/interior-14.jpg",
  "/images/gallery/interior-16.jpg",
  "/images/gallery/interior-17.jpg",
  "/images/gallery/interior-18.jpg",
  "/images/gallery/interior-19.jpg",
  "/images/gallery/interior-20.jpg",
  "/images/gallery/interior-21.jpg",
  "/images/gallery/interior-22.jpg",
  "/images/gallery/interior-23.jpg",
  "/images/gallery/interior-25.jpg",
  "/images/gallery/interior-26.jpg",
  "/images/gallery/interior-27.jpg",
  "/images/gallery/interior-28.jpg",
  "/images/gallery/interior-29.jpg",
  "/images/gallery/interior-30.jpg",
  "/images/gallery/interior-31.jpg",
  "/images/gallery/interior-32.jpg",
  "/images/gallery/interior-33.jpg",
  "/images/gallery/IMG-20251209-WA0013.jpg",
  "/images/gallery/IMG-20251209-WA0014.jpg",
  "/images/gallery/IMG-20251209-WA0015.jpg",
  "/images/gallery/IMG-20251209-WA0016.jpg",
  "/images/gallery/IMG-20251209-WA0017.jpg",
  "/images/gallery/IMG-20251209-WA0018.jpg",
  "/images/gallery/IMG-20251209-WA0019.jpg",
  "/images/gallery/IMG-20251209-WA0020.jpg",
];

const INITIAL_COUNT = 8;

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const displayedPhotos = showAll ? interiorPhotos : interiorPhotos.slice(0, INITIAL_COUNT);

  const openLightbox = (index: number) => {
    // Ak zobrazujeme len časť, index je relatívny k displayedPhotos
    // Ak zobrazujeme všetky, index je už správny
    const actualIndex = showAll ? index : index;
    setCurrentImage(actualIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    const maxIndex = showAll ? interiorPhotos.length - 1 : INITIAL_COUNT - 1;
    setCurrentImage((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevImage = () => {
    const maxIndex = showAll ? interiorPhotos.length - 1 : INITIAL_COUNT - 1;
    setCurrentImage((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/gallery-hero.jpeg"
      />

      {/* Gallery Grid */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                Fotogaléria
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Priestory kaštieľa
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
              Objavte krásu renesančného kaštieľa cez objektív. Interiéry, exteriéry a atmosféra histórie.
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedPhotos.map((photo, i) => (
              <FadeInOnScroll key={photo} delay={Math.min(i * 0.05, 0.3)}>
                <motion.div
                  className={`relative overflow-hidden group cursor-pointer ${
                    i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  onClick={() => openLightbox(i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo}
                      alt={`Interiér kaštieľa ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                    </div>
                  </div>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          <div className="text-center mt-12">
            {!showAll && interiorPhotos.length > INITIAL_COUNT && (
              <motion.button
                onClick={() => setShowAll(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
              >
                Zobraziť všetky fotky ({interiorPhotos.length})
              </motion.button>
            )}
            
            {showAll && (
              <motion.button
                onClick={() => setShowAll(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-charcoal/30 text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-charcoal/5 transition-colors duration-300"
              >
                Zobraziť menej
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Zavrieť"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 md:left-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Predchádzajúci"
            >
              <ChevronLeft className="text-white" size={28} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Nasledujúci"
            >
              <ChevronRight className="text-white" size={28} />
            </button>

            {/* Image container */}
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayedPhotos[currentImage]}
                alt={`Interiér kaštieľa ${currentImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-wider">
              {currentImage + 1} / {displayedPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
