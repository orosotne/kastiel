"use client";

import { useState, useEffect, useCallback } from "react";
import { debugLog } from "@/lib/debug";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, LayoutGrid, Maximize2 } from "lucide-react";
import Image from "next/image";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import BeforeAfterSlider from "@/components/interactive/BeforeAfterSlider";

import restorationConfig from "../../../data/restoration-photos.json";

const RESTORATION_BASE = "/images/phoenix/restoration";

// Konfigurácia - páry obrázkov pred/po
// Pridajte ďalšie páry keď nahráte obrázky do public/images/phoenix/
// Formát: before-X.webp a after-X.webp
const beforeAfterPairs = [
  {
    id: 1,
    before: "/images/phoenix/before-1.webp",
    after: "/images/phoenix/after-1.webp",
    titleKey: "main_facade",
  },
];

// Fotky obnovy – 3 kategórie: KPO (kaštieľ pred obnovou), KP (kaštieľ počas obnovy), ZPO (záhrada počas obnovy)
const restorationCategories = [
  {
    id: "KPO",
    titleKey: "categoryKPO",
    images: (restorationConfig.categories.KPO as string[]).map((f) => `${RESTORATION_BASE}/${f}`),
  },
  {
    id: "KP",
    titleKey: "categoryKP",
    images: (restorationConfig.categories.KP as string[]).map((f) => `${RESTORATION_BASE}/${f}`),
  },
  {
    id: "ZPO",
    titleKey: "categoryZPO",
    images: (restorationConfig.categories.ZPO as string[]).map((f) => `${RESTORATION_BASE}/${f}`),
  },
];

export default function PhoenixSection() {
  const t = useTranslations("phoenix");
  const [activeIndex, setActiveIndex] = useState(0);
  // #region agent log
  useEffect(() => { debugLog({ location: 'PhoenixSection.tsx', message: 'PhoenixSection mounted', data: { section: 'phoenix' }, hypothesisId: 'H4' }); }, []);
  // #endregion

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % beforeAfterPairs.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + beforeAfterPairs.length) % beforeAfterPairs.length);
  };

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container-custom">
        <FadeInOnScroll className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            {t("title")}
          </h2>
          <p className="text-charcoal/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t("description")}
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          {/* Slider */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <BeforeAfterSlider
                  beforeImage={beforeAfterPairs[activeIndex].before}
                  afterImage={beforeAfterPairs[activeIndex].after}
                  beforeLabel={t("before")}
                  afterLabel={t("after")}
                  className="shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation - Arrows + Dots + Counter */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white hover:bg-gold text-charcoal hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group"
              aria-label={t("previous")}
            >
              <ArrowLeft size={24} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {beforeAfterPairs.map((pair, index) => (
                <button
                  key={pair.id}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-gold w-8"
                      : "bg-charcoal/20 hover:bg-charcoal/40 w-3"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white hover:bg-gold text-charcoal hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group"
              aria-label={t("next")}
            >
              <ArrowRight size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Slide Title */}
          <motion.p
            key={`title-${activeIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 text-charcoal/60 font-medium"
          >
            {t(beforeAfterPairs[activeIndex].titleKey)}
          </motion.p>

          {/* Counter */}
          <p className="text-center mt-2 text-sm text-charcoal/40">
            {activeIndex + 1} / {beforeAfterPairs.length}
          </p>
        </FadeInOnScroll>

        {/* Ako prebieha oprava – kategórie fotiek */}
        <RestorationTimeline categories={restorationCategories} titleKey="restorationProgressTitle" t={t} />
      </div>
    </section>
  );
}

type RestorationCategory = {
  id: string;
  titleKey: string;
  images: string[];
};

function RestorationTimeline({
  categories,
  titleKey,
  t,
}: {
  categories: RestorationCategory[];
  titleKey: string;
  t: (key: string) => string;
}) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"single" | "grid">("grid");

  const activeCategory = categories[activeCategoryIndex];
  const images = activeCategory.images;
  const previewImages = images.slice(0, 4);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleCategoryChange = useCallback(
    (index: number) => {
      setActiveCategoryIndex(index);
      setCurrentIndex(0);
      setLightboxOpen(false);
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextPhoto, prevPhoto]);

  return (
    <div className="mt-24 md:mt-32">
      <FadeInOnScroll delay={0}>
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal text-center mb-12 md:mb-16">
          {t(titleKey)}
        </h3>
      </FadeInOnScroll>

      {/* Tab bar – 3 kategórie */}
      <div className="flex justify-center gap-2 mb-10">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(index)}
            className="relative px-4 py-2 md:px-6 md:py-3 text-sm uppercase tracking-wider font-medium transition-colors duration-300"
          >
            <span
              className={
                activeCategoryIndex === index
                  ? "text-charcoal"
                  : "text-charcoal/50 hover:text-charcoal/80"
              }
            >
              {t(cat.titleKey)}
            </span>
            {activeCategoryIndex === index && (
              <motion.div
                layoutId="restoration-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Horizontal row – 4 náhľadové fotky z aktívnej kategórie */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategoryIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible snap-x snap-mandatory"
        >
          <div className="flex gap-4 md:gap-6 min-w-0">
            {previewImages.map((src, index) => (
              <button
                key={src}
                onClick={() => openLightbox(index)}
                className="flex-shrink-0 w-[85vw] md:flex-1 md:min-w-0 md:w-0 max-w-[280px] md:max-w-none snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-xl overflow-hidden shadow-xl bg-charcoal/5 group"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={t("restorationStepAlt") + " " + (index + 1)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, 280px"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA button */}
      <FadeInOnScroll delay={0.1} className="text-center mt-8">
        <button
          onClick={() => openLightbox(0)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold/90 transition-all duration-300 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {t("viewAllPhotos")} ({images.length})
        </button>
      </FadeInOnScroll>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black flex flex-col"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
          >
            {/* Header: view toggle + close */}
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 flex-shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("single");
                  }}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    viewMode === "single" ? "bg-gold text-charcoal" : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                  aria-label={t("viewSingle")}
                >
                  <Maximize2 size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMode("grid");
                  }}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    viewMode === "grid" ? "bg-gold text-charcoal" : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                  aria-label={t("viewGrid")}
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/30 hover:bg-gold rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg border border-white/20"
                aria-label={t("close")}
              >
                <X className="text-white" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden px-4 md:px-6 pb-6" onClick={(e) => e.stopPropagation()}>
              {viewMode === "single" ? (
                <motion.div
                  key="single"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative max-w-6xl w-full flex flex-col items-center"
                >
                  <div className="relative aspect-[4/3] md:aspect-[16/10] w-full bg-charcoal/50 rounded-xl overflow-hidden">
                    <Image
                      src={images[currentIndex]}
                      alt={t("restorationStepAlt") + " " + (currentIndex + 1)}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPhoto();
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300"
                      aria-label={t("previous")}
                    >
                      <ChevronLeft className="text-white" size={24} />
                    </button>
                    <span className="text-white/70 text-sm min-w-[60px] text-center">
                      {currentIndex + 1} / {images.length}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPhoto();
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300"
                      aria-label={t("next")}
                    >
                      <ChevronRight className="text-white" size={24} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full max-w-6xl h-full overflow-y-auto"
                >
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3 p-2 pb-8">
                    {images.map((src, index) => (
                      <button
                        key={src}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(index);
                          setViewMode("single");
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                          index === currentIndex ? "z-10 ring-2 ring-gold ring-offset-2 ring-offset-black outline-none" : "hover:opacity-90"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={t("restorationStepAlt") + " " + (index + 1)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
