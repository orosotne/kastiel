"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import InternalLinks from "@/components/layout/InternalLinks";
import HorizontalTimeline from "@/components/interactive/HorizontalTimeline";
import MuseumGallery from "@/components/sections/MuseumGallery";
import { X, ChevronLeft, ChevronRight, Landmark, Palette, Shield, Castle, ImageIcon } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";

// Non-translatable metadata; all text comes from the i18n "story" namespace.
type Owner = { period: string; name: string; desc: string; hasImage: boolean; image: string };

const PHOTO_SRCS = [
  "/images/history/history-1.webp",
  "/images/history/history-2.webp",
  "/images/history/history-3.webp",
  "/images/history/history-4.webp",
  "/images/history/history-5.webp",
  "/images/history/history-6.webp",
  "/images/history/history-7.webp",
  "/images/history/history-8.webp",
  "/images/history/history-9.webp",
  "/images/history/history-10.webp",
];

const STAGE_COLORS = [
  "gothic", "gothic", "renaissance", "renaissance", "renaissance", "baroque",
  "baroque", "baroque", "baroque", "modern", "modern", "modern",
] as const;

const HIGHLIGHT_ICONS = [Palette, Palette, Castle, Shield];

const OWNER_META = [
  { hasImage: false, image: "" },
  { hasImage: true, image: "/images/bosaniovci.webp" },
  { hasImage: false, image: "" },
  { hasImage: true, image: "/images/schmitt.webp" },
  { hasImage: false, image: "" },
  { hasImage: false, image: "" },
];

export default function StoryPage() {
  const t = useTranslations("story");
  const c = useTranslations("common");

  const historyPhotos = (t.raw("photos") as { title: string; year: string; description: string }[]).map(
    (p, i) => ({ ...p, src: PHOTO_SRCS[i] })
  );
  const buildingHistory = (t.raw("stages") as { year: string; period: string; title: string; description: string }[]).map(
    (s, i) => ({ ...s, color: STAGE_COLORS[i] })
  );
  const highlights = (t.raw("highlights") as { title: string; description: string }[]).map(
    (h, i) => ({ ...h, icon: HIGHLIGHT_ICONS[i] })
  );
  const owners: Owner[] = (t.raw("owners") as { period: string; name: string; desc: string }[]).map(
    (o, i) => ({ ...o, ...OWNER_META[i] })
  );
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  
  // Owner modal state
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  
  const openOwnerModal = (owner: Owner) => {
    setSelectedOwner(owner);
    setOwnerModalOpen(true);
  };
  const totalImages = 62;
  const initialDisplay = 8;

  useScrollLock(lightboxOpen);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/story-hero.webp"
      />

      {/* Historical Photos Museum Gallery */}
      <MuseumGallery
        photos={historyPhotos}
        title={t("museum_title")}
        subtitle={t("museum_subtitle")}
      />

      {/* Horizontal Timeline Section */}
      <section className="py-24 md:py-32 bg-cream overflow-hidden">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <SectionEyebrow label={t("eyebrow_construction")} className="mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t("timeline_heading")}
            </h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto">
              {t("timeline_intro")}
            </p>
          </FadeInOnScroll>
        </div>
        
        <HorizontalTimeline events={buildingHistory} />
      </section>

      {/* Highlights Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-16">
            <SectionEyebrow label={t("eyebrow_discoveries")} className="mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {t("highlights_heading")}
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-cream p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                      <Icon size={28} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-charcoal mb-3">
                      {item.title}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Owners Section */}
      <section className="py-24 md:py-32 bg-charcoal text-white">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-16">
            <SectionEyebrow label={t("eyebrow_heritage")} className="mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl">
              {t("owners_heading")}
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              {t("owners_intro")}
            </p>
          </FadeInOnScroll>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gold/30 -translate-x-1/2" />

            <div className="space-y-8">
              {owners.map((owner, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                      <span className="text-gold font-medium">{owner.period}</span>
                      
                      {owner.hasImage ? (
                        <motion.button
                          onClick={() => openOwnerModal(owner)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group flex items-center gap-3 mt-1 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                        >
                          <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors duration-300">
                            {owner.name}
                          </h3>
                          <span className="flex items-center gap-1 px-3 py-1 bg-gold/20 text-gold text-xs uppercase tracking-wider rounded-full group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                            <ImageIcon size={14} />
                            Zobraziť foto
                          </span>
                        </motion.button>
                      ) : (
                        <h3 className="font-serif text-xl mt-1">{owner.name}</h3>
                      )}
                      
                      <p className="text-white/60 text-sm mt-1">{owner.desc}</p>
                    </div>
                    
                    <div className="absolute left-4 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 w-4 h-4 bg-gold rounded-full shadow-lg z-10" />
                    
                    <div className="flex-1 hidden md:block" />
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <SectionEyebrow label={t("eyebrow_before")} className="mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {t("ruins_heading")}
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
              {t("ruins_intro")}
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: showAll ? totalImages : initialDisplay }, (_, i) => i + 1).map((i) => (
              <FadeInOnScroll key={i} delay={Math.min(i * 0.05, 0.3)}>
                <motion.div 
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(i - 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={`/images/gallery/analysis-${i}.webp`}
                    alt={`${t("analytical_probe_alt")} ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium tracking-wide">
                      Zväčšiť
                    </span>
                  </div>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {!showAll && (
            <FadeInOnScroll className="text-center mt-10">
              <motion.button
                onClick={() => setShowAll(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
              >
                {c("show_all")} ({totalImages})
              </motion.button>
            </FadeInOnScroll>
          )}
          
          {showAll && (
            <FadeInOnScroll className="text-center mt-10">
              <motion.button
                onClick={() => setShowAll(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-charcoal/30 text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-charcoal/5 transition-colors duration-300"
              >
                Zobraziť menej
              </motion.button>
            </FadeInOnScroll>
          )}
        </div>
      </section>

      <InternalLinks
        links={[
          { href: "/svadby", labelKey: "weddings" },
          { href: "/galeria", labelKey: "gallery" },
          { href: "/kontakt", labelKey: "contact" },
        ]}
      />

      {/* Owner Photo Modal */}
      <AnimatePresence>
        {ownerModalOpen && selectedOwner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setOwnerModalOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setOwnerModalOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Zavrieť"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-charcoal rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={selectedOwner.image}
                  alt={selectedOwner.name}
                  fill
                  className="object-contain bg-black"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="p-6 md:p-8 text-center">
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                  {selectedOwner.name}
                </h3>
                <p className="text-white/60">
                  {selectedOwner.desc}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-gold text-sm">{selectedOwner.period}</span>
                  <span className="w-1 h-1 bg-gold/50 rounded-full" />
                  <span className="text-white/40 text-sm">Historická fotografia</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                src={`/images/gallery/analysis-${currentImage + 1}.webp`}
                alt={`${t("analytical_probe_alt")} ${currentImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-wider">
              {currentImage + 1} / {totalImages}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



