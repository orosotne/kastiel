"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AlertTriangle, Heart, Building2, FileText, X, ZoomIn } from "lucide-react";

const rich = {
  b: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
  em: (chunks: React.ReactNode) => <em>{chunks}</em>,
  gold: (chunks: React.ReactNode) => <strong className="text-gold">{chunks}</strong>,
  red: (chunks: React.ReactNode) => <span className="text-red-500 font-bold">{chunks}</span>,
};

export default function OznameniePage() {
  const t = useTranslations("announcement");
  const c = useTranslations("common");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <PageHero
        title={t("hero_title")}
        subtitle={t.rich("hero_subtitle", rich)}
        backgroundImage="/images/story-hero.webp"
        grayscale={true}
      />

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={32} className="text-red-700" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal">
                  {t("intro_heading")}
                </h2>
                <p className="text-charcoal/60">{t("intro_date")}</p>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="bg-red-50 border-l-4 border-red-700 p-6 md:p-8 mb-12">
              <p className="text-lg md:text-xl text-charcoal leading-relaxed mb-4">
                {t.rich("intro_banner", rich)}
              </p>
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-medium text-sm transition-colors"
              >
                <FileText size={16} />
                {t("view_decision")}
              </button>
            </div>
          </FadeInOnScroll>

          {/* O nás */}
          <FadeInOnScroll delay={0.2}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={24} className="text-gold" />
                <h3 className="font-serif text-xl text-charcoal">{t("about_heading")}</h3>
              </div>
              <p className="text-charcoal/80 leading-relaxed mb-4">
                {t.rich("about_text", rich)}
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Hlavné stanovisko */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <SectionEyebrow label={t("statement_eyebrow")} className="mb-8" />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-charcoal/80 leading-relaxed mb-6">
                {t.rich("statement_p1", rich)}
              </p>

              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-charcoal/10 my-8">
                <p className="text-charcoal/80 leading-relaxed italic font-serif text-lg">
                  {t("statement_quote")}
                </p>
              </div>

              <p className="text-charcoal/80 leading-relaxed mb-6">
                {t("statement_p2")}
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Systémový problém */}
      <section className="py-16 md:py-24 bg-charcoal text-white">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
              {t("systemic_heading")}
            </h2>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>{t.rich("systemic_p1", rich)}</p>

              <p>{t.rich("systemic_p2", rich)}</p>

              <div className="bg-white/10 p-6 rounded-xl my-8">
                <p className="text-white/90">
                  {t.rich("systemic_box", rich)}
                </p>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Výzva */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-gold" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
                {t("continue_heading")}
              </h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto">
                {t("continue_text")}
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="bg-cream p-8 rounded-xl">
              <p className="text-charcoal/80 leading-relaxed font-serif italic text-lg text-center">
                {t("continue_quote")}
              </p>
            </div>
          </FadeInOnScroll>

          {/* Oficiálny dokument - klikateľný */}
          <FadeInOnScroll delay={0.2}>
            <div className="mt-12">
              <h3 className="font-serif text-xl text-charcoal text-center mb-6">
                {t("doc_heading")}
              </h3>

              <motion.button
                onClick={() => setLightboxOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:border-red-300"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-red-700 rounded-full flex items-center justify-center group-hover:bg-red-800 transition-colors">
                    <FileText size={40} className="text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-charcoal text-lg mb-2">
                      {t("doc_title")}
                    </p>
                    <p className="text-charcoal/60 text-sm mb-4">
                      {t("doc_subtitle")}
                    </p>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 text-white text-sm font-medium rounded-full group-hover:bg-red-800 transition-colors">
                      <ZoomIn size={16} />
                      {t("doc_cta")}
                    </span>
                  </div>
                </div>
              </motion.button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-8 bg-cream border-t border-charcoal/10">
        <div className="container-custom max-w-4xl">
          <p className="text-center text-charcoal/50 text-sm">
            {t("footer_note")}
          </p>
        </div>
      </section>

      {/* Lightbox pre dokument */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label={c("close")}
            >
              <X className="text-white" size={24} />
            </button>

            {/* Document container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/zamietnutie-mcrs-2.webp"
                alt={t("doc_alt")}
                width={1200}
                height={1600}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
