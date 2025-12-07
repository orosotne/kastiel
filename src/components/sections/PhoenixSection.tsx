"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import BeforeAfterSlider from "@/components/interactive/BeforeAfterSlider";

// Konfigurácia - páry obrázkov pred/po
// Pridajte ďalšie páry keď nahráte obrázky do public/images/phoenix/
// Formát: before-X.jpeg a after-X.jpeg
const beforeAfterPairs = [
  {
    id: 1,
    before: "/images/phoenix/before-1.jpeg",
    after: "/images/phoenix/after-1.jpeg",
    title: "Hlavná fasáda",
  },
  // Odkomentujte keď nahráte after-2.jpeg:
  // {
  //   id: 2,
  //   before: "/images/phoenix/before-2.jpeg",
  //   after: "/images/phoenix/after-2.jpeg",
  //   title: "Nádvorie",
  // },
];

export default function PhoenixSection() {
  const t = useTranslations("phoenix");
  const [activeIndex, setActiveIndex] = useState(0);

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
              aria-label="Predchádzajúce"
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
              aria-label="Nasledujúce"
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
            {beforeAfterPairs[activeIndex].title}
          </motion.p>

          {/* Counter */}
          <p className="text-center mt-2 text-sm text-charcoal/40">
            {activeIndex + 1} / {beforeAfterPairs.length}
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
