"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";

interface HistoryPhoto {
  src: string;
  title: string;
  year: string;
  description: string;
}

interface MuseumGalleryProps {
  photos: HistoryPhoto[];
  title?: string;
  subtitle?: string;
}

// Initial counts: 6 for desktop (3x2), 4 for mobile (2x2)
const DESKTOP_INITIAL = 6;
const MOBILE_INITIAL = 4;

export default function MuseumGallery({
  photos,
  title = "Historické skvosty",
  subtitle = "Vzácne fotografické dokumenty z archívu kaštieľa",
}: MuseumGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const initialCount = isMobile ? MOBILE_INITIAL : DESKTOP_INITIAL;
  const displayedPhotos = showAll ? photos : photos.slice(0, initialCount);
  const hasMore = photos.length > initialCount;

  const openLightbox = (index: number) => {
    // Find the actual index in full photos array
    const actualIndex = showAll ? index : index;
    setCurrentIndex(actualIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <section className="py-24 md:py-32 bg-gradient-to-b from-charcoal via-slate-castle to-charcoal relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/texture-paper.png')] bg-repeat" />
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <FadeInOnScroll className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.3em] text-gold font-light">
                Archív
              </span>
              <div className="w-16 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              {title}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              {subtitle}
            </p>
          </FadeInOnScroll>

          {/* Gallery Grid - 2 columns on mobile, 3 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
            {displayedPhotos.map((photo, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  {/* Frame */}
                  <div className="relative bg-gradient-to-br from-gold/30 via-gold/20 to-gold/10 p-3 md:p-4 rounded-sm shadow-2xl">
                    {/* Inner frame border */}
                    <div className="absolute inset-2 md:inset-3 border border-gold/30 pointer-events-none" />
                    
                    {/* Passepartout */}
                    <div className="bg-cream p-3 md:p-4">
                      {/* Photo container */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/10">
                        <Image
                          src={photo.src}
                          alt={photo.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 filter sepia-[0.15]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-white text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gold/80 px-4 py-2">
                            Zobraziť detail
                          </span>
                        </div>

                        {/* Vintage corner decorations */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>

                  {/* Museum label/plaque */}
                  <div className="mt-2 md:mt-4 bg-cream/95 backdrop-blur-sm p-2 md:p-4 border-l-2 md:border-l-4 border-gold shadow-md">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-2">
                      <div className="min-w-0">
                        <h3 className="font-serif text-charcoal text-sm md:text-lg leading-tight truncate">
                          {photo.title}
                        </h3>
                        <p className="text-charcoal/60 text-xs md:text-sm mt-1 leading-relaxed line-clamp-2">
                          {photo.description}
                        </p>
                      </div>
                      <span className="text-gold font-serif text-xs md:text-lg whitespace-nowrap">
                        {photo.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>

          {/* Show more/less button */}
          {hasMore && (
            <FadeInOnScroll className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-3 bg-gold/20 hover:bg-gold text-gold hover:text-charcoal px-8 py-4 rounded-full transition-all duration-300 font-medium uppercase tracking-wider text-sm group"
              >
                {showAll ? (
                  <>
                    <Minus size={18} className="group-hover:scale-110 transition-transform" />
                    Zobraziť menej
                  </>
                ) : (
                  <>
                    <Plus size={18} className="group-hover:scale-110 transition-transform" />
                    Načítať viac ({photos.length - initialCount})
                  </>
                )}
              </button>
            </FadeInOnScroll>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/30 hover:bg-gold rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg border border-white/20"
              aria-label="Zavrieť"
            >
              <X className="text-white" size={20} />
            </button>

            {/* Photo content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full mx-4 md:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Frame in lightbox */}
              <div className="bg-gradient-to-br from-gold/40 via-gold/20 to-gold/10 p-4 md:p-6 shadow-2xl">
                <div className="bg-cream p-4 md:p-6">
                  <div className="relative aspect-[4/3] md:aspect-[16/10]">
                    <Image
                      src={photos[currentIndex].src}
                      alt={photos[currentIndex].title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="text-center bg-charcoal p-4 md:p-6">
                <h3 className="font-serif text-xl md:text-3xl text-white mb-2">
                  {photos[currentIndex].title}
                </h3>
                <p className="text-white/70 text-sm md:text-lg mb-3">
                  {photos[currentIndex].description}
                </p>
                <span className="inline-block bg-gold/30 text-gold px-4 py-1 rounded-full text-xs md:text-sm">
                  {photos[currentIndex].year}
                </span>
                
                {/* Navigation & Counter */}
                <div className="flex items-center justify-center gap-6 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                    aria-label="Predchádzajúca fotka"
                  >
                    <ChevronLeft className="text-white group-hover:text-charcoal" size={24} />
                  </button>
                  
                  <span className="text-white/50 text-sm min-w-[60px]">
                    {currentIndex + 1} / {photos.length}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextPhoto();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 group"
                    aria-label="Nasledujúca fotka"
                  >
                    <ChevronRight className="text-white group-hover:text-charcoal" size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

