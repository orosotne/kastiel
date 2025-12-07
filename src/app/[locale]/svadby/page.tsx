"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { Heart, Users, Calendar, Send, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function WeddingsPage() {
  const t = useTranslations("weddings");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = 8;

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/wedding-hero.png"
      />

      {/* Venue Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInOnScroll direction="left">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-gold" />
                  <span className="text-sm uppercase tracking-[0.2em] text-gold">
                    Venue
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  {t("venue.title")}
                </h2>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {t("venue.description")}
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="text-gold" size={24} />
                    </div>
                    <span className="text-sm text-charcoal/60">Romantika</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="text-gold" size={24} />
                    </div>
                    <span className="text-sm text-charcoal/60">Do 150 hostí</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="text-gold" size={24} />
                    </div>
                    <span className="text-sm text-charcoal/60">Celoročne</span>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/wedding-venue.jpg"
                    alt="Svadobný priestor"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative frame - hidden on mobile to prevent overflow */}
                <div className="hidden md:block absolute -bottom-6 -left-6 w-full h-full border-2 border-gold -z-10" />
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Galéria svadieb
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FadeInOnScroll key={i} delay={i * 0.05}>
                <motion.div 
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(i - 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={`/images/weddings/wedding-${i}.jpg`}
                    alt={`Svadba ${i}`}
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
        </div>
      </section>

      {/* Mascots Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-renaissance-green text-white relative overflow-hidden">
        {/* Desktop/Tablet Alpacas - hidden on mobile */}
        {/* Left Alpaca - Boška */}
        <div className="hidden md:block absolute -left-8 lg:-left-4 bottom-0 w-[280px] lg:w-[400px] xl:w-[480px] h-[380px] lg:h-[500px] xl:h-[580px] z-20 pointer-events-none">
          <Image
            src="/images/alpaca-boska.png"
            alt="Alpaka Boška"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            sizes="(max-width: 1024px) 280px, (max-width: 1280px) 400px, 480px"
          />
        </div>

        {/* Right Alpaca - Rišo */}
        <div className="hidden md:block absolute -right-8 lg:-right-4 bottom-0 w-[280px] lg:w-[400px] xl:w-[480px] h-[380px] lg:h-[500px] xl:h-[580px] z-20 pointer-events-none">
          <Image
            src="/images/alpaca-riso.png"
            alt="Alpaka Rišo"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            sizes="(max-width: 1024px) 280px, (max-width: 1280px) 400px, 480px"
          />
        </div>

        {/* Mobile Alpacas - shown only on mobile */}
        <div className="md:hidden flex justify-between mb-4">
          <div className="relative w-[50%] h-[220px] -ml-12">
            <Image
              src="/images/alpaca-boska.png"
              alt="Alpaka Boška"
              fill
              className="object-contain object-left drop-shadow-xl"
              sizes="50vw"
            />
          </div>
          <div className="relative w-[50%] h-[220px] -mr-12">
            <Image
              src="/images/alpaca-riso.png"
              alt="Alpaka Rišo"
              fill
              className="object-contain object-right drop-shadow-xl"
              sizes="50vw"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="container-custom relative z-10 px-4 md:px-20 lg:px-28 xl:px-36">
          <FadeInOnScroll direction="up">
            <div className="max-w-md md:max-w-lg mx-auto text-center space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-white/40" />
                <span className="text-sm uppercase tracking-[0.2em] text-white/70">
                  Naši maskoti
                </span>
                <div className="w-12 h-[1px] bg-white/40" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                {t("mascots.title")}
              </h2>
              
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                {t("mascots.description")}
              </p>

              <div className="flex flex-wrap justify-center gap-3 md:gap-5 pt-4 md:pt-6">
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🦙</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Boška</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🦙</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Rišo</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐟</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Kapry</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐰</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Zajace</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐔</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Sliepky</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🪿</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Husi</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🦢</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Labute</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐕</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">Pes</span>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom max-w-3xl">
          <FadeInOnScroll className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {t("form.title")}
            </h2>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-charcoal/60 mb-2">
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-charcoal/20 focus:border-gold focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-2">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-charcoal/20 focus:border-gold focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-charcoal/60 mb-2">
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-charcoal/20 focus:border-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-2">
                    {t("form.date")}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-charcoal/20 focus:border-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-2">
                    {t("form.guests")}
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-charcoal/20 focus:border-gold focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-charcoal/60 mb-2">
                  {t("form.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-charcoal/20 focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {t("form.submit")}
              </motion.button>
            </form>
          </FadeInOnScroll>
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
            onKeyDown={handleKeyDown}
            tabIndex={0}
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
                src={`/images/weddings/wedding-${currentImage + 1}.jpg`}
                alt={`Svadba ${currentImage + 1}`}
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

            {/* Thumbnail navigation */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(i - 1);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImage === i - 1
                      ? "bg-gold w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Obrázok ${i}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



