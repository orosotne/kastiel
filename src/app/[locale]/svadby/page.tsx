"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import InternalLinks from "@/components/layout/InternalLinks";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heart, Users, Calendar, Send } from "lucide-react";
import { CONTACT } from "@/lib/site-config";
import { PhotoGrid } from "@/components/ui/PhotoGrid";

export default function WeddingsPage() {
  const t = useTranslations("weddings");
  const wp = useTranslations("weddings_page");
  const c = useTranslations("common");
  const nav = useTranslations("navigation");
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Svadobný dopyt – ${formData.name}`);
    const body = encodeURIComponent(
      `Meno: ${formData.name}\nEmail: ${formData.email}\nTelefón: ${formData.phone}\nDátum: ${formData.date}\nPočet hostí: ${formData.guests}\n\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <BreadcrumbStructuredData
        locale={locale}
        items={[
          { name: nav("home"), path: "" },
          { name: nav("weddings"), path: "/svadby" },
        ]}
      />
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/wedding-hero.webp"
      />

      {/* Venue Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInOnScroll direction="left">
              <div className="space-y-6">
                <SectionEyebrow label={wp("venue_label")} align="left" />
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  {t("venue.title")}
                </h2>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {t("venue.description")}
                </p>
                <p className="text-charcoal/60 text-base">
                  {t("venue.location_note")}
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="text-gold" size={24} />
                    </div>
                    <span className="text-sm text-charcoal/60">{wp("romance")}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="text-gold" size={24} />
                    </div>
                    <span className="text-sm text-charcoal/60">{wp("guests_count")}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="text-gold" size={24} />
                    </div>
                    <span className="text-sm text-charcoal/60">{wp("year_round")}</span>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/wedding-venue.webp"
                    alt={wp("venue_alt")}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
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
              {wp("gallery_title")}
            </h2>
          </FadeInOnScroll>

          <PhotoGrid
            photos={[1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
              src: `/images/weddings/wedding-${i}.webp`,
              alt: `${wp("wedding_photo")} ${i}`,
            }))}
            columns={4}
            initialCount={8}
            hoverLabel={c("zoom")}
            showThumbnails
            revealOnScroll
            sizes="(max-width: 768px) 50vw, 25vw"
            labels={{ close: c("close"), previous: c("previous"), next: c("next"), image: c("image") }}
          />
        </div>
      </section>

      {/* Mascots Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-renaissance-green text-white relative overflow-hidden">
        {/* Desktop/Tablet Alpacas - hidden on mobile */}
        {/* Left Alpaca - Boška */}
        <div className="hidden md:block absolute -left-8 lg:-left-4 bottom-0 w-[280px] lg:w-[400px] xl:w-[480px] h-[380px] lg:h-[500px] xl:h-[580px] z-20 pointer-events-none">
          <Image
            src="/images/alpaca-boska.webp"
            alt="Alpaka Boška"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            sizes="(max-width: 1024px) 280px, (max-width: 1280px) 400px, 480px"
          />
        </div>

        {/* Right Alpaca - Rišo */}
        <div className="hidden md:block absolute -right-8 lg:-right-4 bottom-0 w-[280px] lg:w-[400px] xl:w-[480px] h-[380px] lg:h-[500px] xl:h-[580px] z-20 pointer-events-none">
          <Image
            src="/images/alpaca-riso.webp"
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
              src="/images/alpaca-boska.webp"
              alt="Alpaka Boška"
              fill
              className="object-contain object-left drop-shadow-xl"
              sizes="50vw"
            />
          </div>
          <div className="relative w-[50%] h-[220px] -mr-12">
            <Image
              src="/images/alpaca-riso.webp"
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
                  {wp("mascots_label")}
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
                  <span className="text-white font-medium text-xs md:text-sm">{wp("boska")}</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🦙</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">{wp("riso")}</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐟</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">{wp("carp")}</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐰</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">{wp("rabbits")}</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐔</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">{wp("chickens")}</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🪿</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">{wp("geese")}</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🦢</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">{wp("swans")}</span>
                </div>
                <div className="text-center w-[60px] md:w-auto">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 backdrop-blur-sm">
                    <span className="text-base md:text-xl">🐕</span>
                  </div>
                  <span className="text-white font-medium text-xs md:text-sm">{wp("dog")}</span>
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

      <InternalLinks
        links={[
          { href: "/galeria", labelKey: "gallery" },
          { href: "/pribeh", labelKey: "story" },
          { href: "/kontakt", labelKey: "contact" },
        ]}
      />

    </>
  );
}



