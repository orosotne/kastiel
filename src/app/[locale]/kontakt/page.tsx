"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const footer = useTranslations("footer");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        backgroundImage="/images/contact-hero.jpeg"
      />

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <FadeInOnScroll direction="left">
              <div className="bg-white p-8 md:p-12 shadow-lg">
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
                  Napíšte nám
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-charcoal/60 mb-2">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-gold focus:outline-none transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-gold focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-charcoal/60 mb-2">
                      {t("form.subject")}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-charcoal/60 mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-cream border border-charcoal/10 focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                      required
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
              </div>
            </FadeInOnScroll>

            {/* Contact Info */}
            <FadeInOnScroll direction="right" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
                    Kontaktné údaje
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-gold" size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal mb-1">
                          {t("info.address")}
                        </h4>
                        <p className="text-charcoal/60">
                          Kaštieľ Bošany<br />
                          956 18 Bošany<br />
                          Slovensko
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="text-gold" size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal mb-1">
                          {t("info.phone")}
                        </h4>
                        <a
                          href="tel:+421000000000"
                          className="text-charcoal/60 hover:text-gold transition-colors duration-300"
                        >
                          +421 000 000 000
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="text-gold" size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal mb-1">
                          {t("info.email")}
                        </h4>
                        <a
                          href="mailto:info@inintegrum.sk"
                          className="text-charcoal/60 hover:text-gold transition-colors duration-300"
                        >
                          info@inintegrum.sk
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="text-gold" size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal mb-1">
                          Otváracie hodiny
                        </h4>
                        <p className="text-charcoal/60">
                          Po - Ne: 9:00 - 18:00<br />
                          (alebo podľa dohody)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="relative aspect-video bg-slate-castle/10 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2641.0!2d18.15!3d48.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQm_FoWFueQ!5e0!3m2!1ssk!2ssk!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>

                {/* Newsletter */}
                <div className="bg-slate-castle p-8">
                  <h3 className="font-serif text-xl text-white mb-4">
                    {footer("newsletter.title")}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Prihláste sa na odber noviniek a nezmeškajte žiadne podujatie.
                  </p>
                  <form className="flex gap-2">
                    <input
                      type="email"
                      placeholder={footer("newsletter.placeholder")}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gold text-charcoal font-medium hover:bg-gold-dark transition-colors duration-300"
                    >
                      {footer("newsletter.button")}
                    </motion.button>
                  </form>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}



