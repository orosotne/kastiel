"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { Heart, Users, Calendar, Send } from "lucide-react";

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
        backgroundImage="/images/wedding-hero.jpg"
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
                <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-gold -z-10" />
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
                <div className="relative aspect-square overflow-hidden group cursor-pointer">
                  <Image
                    src={`/images/weddings/wedding-${i}.jpg`}
                    alt={`Svadba ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300" />
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Mascots Section */}
      <section className="py-24 md:py-32 bg-renaissance-green text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInOnScroll direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/alpacas.jpg"
                  alt="Alpaky Boška a Rišo"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="space-y-6">
                <h2 className="font-serif text-3xl md:text-4xl">
                  {t("mascots.title")}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  {t("mascots.description")}
                </p>
              </div>
            </FadeInOnScroll>
          </div>
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
    </>
  );
}



