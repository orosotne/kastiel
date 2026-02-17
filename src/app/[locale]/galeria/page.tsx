"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const interiorPhotos = [
  "/images/gallery/interior/interior-1.webp",
  "/images/gallery/interior/interior-2.webp",
  "/images/gallery/interior/interior-3.webp",
  "/images/gallery/interior/interior-4.webp",
  "/images/gallery/interior/interior-5.webp",
  "/images/gallery/interior/interior-6.webp",
  "/images/gallery/interior/interior-7.webp",
  "/images/gallery/interior/interior-8.webp",
  "/images/gallery/interior/interior-9.webp",
  "/images/gallery/interior/interior-10.webp",
  "/images/gallery/interior/interior-11.webp",
  "/images/gallery/interior/interior-12.webp",
  "/images/gallery/interior/interior-13.webp",
  "/images/gallery/interior/interior-14.webp",
  "/images/gallery/interior/interior-15.webp",
  "/images/gallery/interior/interior-16.webp",
  "/images/gallery/interior/interior-17.webp",
  "/images/gallery/interior/interior-18.webp",
  "/images/gallery/interior/interior-19.webp",
  "/images/gallery/interior/interior-21.webp",
  "/images/gallery/interior/interior-22.webp",
  "/images/gallery/interior/interior-23.webp",
  "/images/gallery/interior/interior-24.webp",
  "/images/gallery/interior/interior-25.webp",
];

const exteriorPhotos = [
  "/images/gallery/exterior/exterior-1.webp",
  "/images/gallery/exterior/exterior-2.webp",
  "/images/gallery/exterior/exterior-3.webp",
  "/images/gallery/exterior/exterior-4.webp",
  "/images/gallery/exterior/exterior-5.webp",
  "/images/gallery/exterior/exterior-6.webp",
  "/images/gallery/exterior/exterior-7.webp",
  "/images/gallery/exterior/exterior-8.webp",
  "/images/gallery/exterior/exterior-9.webp",
  "/images/gallery/exterior/exterior-13.webp",
  "/images/gallery/exterior/exterior-14.webp",
  "/images/gallery/exterior/exterior-15.webp",
  "/images/gallery/exterior/exterior-16.webp",
  "/images/gallery/exterior/exterior-17.webp",
  "/images/gallery/exterior/exterior-18.webp",
  "/images/gallery/exterior/exterior-19.webp",
  "/images/gallery/exterior/exterior-21.webp",
  "/images/gallery/exterior/exterior-22.webp",
  "/images/gallery/exterior/exterior-23.webp",
  "/images/gallery/exterior/exterior-25.webp",
  "/images/gallery/exterior/exterior-26.webp",
  "/images/gallery/exterior/exterior-27.webp",
  "/images/gallery/exterior/exterior-28.webp",
  "/images/gallery/exterior/exterior-29.webp",
  "/images/gallery/exterior/exterior-30.webp",
  "/images/gallery/exterior/exterior-32.webp",
  "/images/gallery/exterior/exterior-33.webp",
  "/images/gallery/exterior/exterior-34.webp",
  "/images/gallery/exterior/exterior-35.webp",
  "/images/gallery/exterior/exterior-36.webp",
  "/images/gallery/exterior/exterior-37.webp",
  "/images/gallery/exterior/exterior-38.webp",
  "/images/gallery/exterior/exterior-39.webp",
  "/images/gallery/exterior/exterior-40.webp",
];

type TabKey = "interior" | "exterior";

const INITIAL_COUNT = 8;

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const gp = useTranslations("gallery_page");
  const c = useTranslations("common");

  const [activeTab, setActiveTab] = useState<TabKey>("interior");
  const [showAllInterior, setShowAllInterior] = useState(false);
  const [showAllExterior, setShowAllExterior] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const lightboxRef = useRef<HTMLDivElement>(null);

  const showAll = activeTab === "interior" ? showAllInterior : showAllExterior;
  const setShowAll = activeTab === "interior" ? setShowAllInterior : setShowAllExterior;

  const allPhotos = activeTab === "interior" ? interiorPhotos : exteriorPhotos;
  const displayedPhotos = useMemo(
    () => (showAll ? allPhotos : allPhotos.slice(0, INITIAL_COUNT)),
    [showAll, allPhotos]
  );

  const altPrefix = activeTab === "interior" ? c("castle_interior") : c("castle_exterior");

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % allPhotos.length);
  }, [allPhotos.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  }, [allPhotos.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    },
    [closeLightbox, nextImage, prevImage]
  );

  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [lightboxOpen]);

  const handleTabChange = useCallback((tab: TabKey) => {
    setActiveTab(tab);
    setLightboxOpen(false);
    setCurrentImage(0);
  }, []);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "interior", label: gp("tab_interior") },
    { key: "exterior", label: gp("tab_exterior") },
  ];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/gallery-hero.webp"
      />

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                {gp("label")}
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {gp("title")}
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
              {gp("description")}
            </p>
          </FadeInOnScroll>

          {/* Tab bar */}
          <div className="flex justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className="relative px-6 py-3 text-sm uppercase tracking-wider font-medium transition-colors duration-300"
              >
                <span
                  className={
                    activeTab === tab.key ? "text-charcoal" : "text-charcoal/50 hover:text-charcoal/80"
                  }
                >
                  {tab.label}
                </span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="gallery-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Gallery grid with animated transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
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
                          alt={`${altPrefix} ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                          <ZoomIn
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            size={32}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </FadeInOnScroll>
                ))}
              </div>

              {/* Show More / Show Less Button */}
              <div className="text-center mt-12">
                {!showAll && allPhotos.length > INITIAL_COUNT && (
                  <motion.button
                    onClick={() => setShowAll(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
                  >
                    {c("show_all")} ({allPhotos.length})
                  </motion.button>
                )}

                {showAll && (
                  <motion.button
                    onClick={() => setShowAll(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-charcoal/30 text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-charcoal/5 transition-colors duration-300"
                  >
                    {c("show_less")}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label={c("close")}
            >
              <X className="text-white" size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 md:left-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label={c("previous")}
            >
              <ChevronLeft className="text-white" size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label={c("next")}
            >
              <ChevronRight className="text-white" size={28} />
            </button>

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
                src={allPhotos[currentImage]}
                alt={`${altPrefix} ${currentImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-wider">
              {currentImage + 1} / {allPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
