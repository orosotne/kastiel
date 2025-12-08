"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone, MapPin, Building2 } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}/pribeh`, label: nav("story") },
    { href: `/${locale}/svadby`, label: nav("weddings") },
    { href: `/${locale}/galeria`, label: nav("gallery") },
    { href: `/${locale}/kontakt`, label: nav("contact") },
  ];

  return (
    <footer className="bg-slate-castle text-ivory">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-6">
              <h3 className="font-serif text-3xl text-white">In Integrum</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                Kaštieľ Bošany
              </span>
            </Link>
            <p className="text-ivory/70 text-sm leading-relaxed">
              {t("motto")}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/renesancny_kastiel_bosany/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-ivory/20 hover:border-gold hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-ivory/20 hover:border-gold hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">{t("navigation")}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Občianske združenie Column */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Občianske združenie</h4>
            <ul className="space-y-4 text-ivory/70 text-sm">
              <li className="flex items-start gap-3">
                <Building2 size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-white">IN INTEGRUM</strong><br />
                  IČO: 42024757<br />
                  DIČ: 2022449737
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <span>
                  SNP 113/1<br />
                  956 18 Bošany
                </span>
              </li>
              <li>
                <a
                  href="tel:+421907726726"
                  className="flex items-center gap-3 hover:text-gold transition-colors duration-300"
                >
                  <Phone size={18} className="text-gold flex-shrink-0" />
                  +421 907 726 726
                </a>
              </li>
              <li>
                <a
                  href="mailto:jmiskeje@gmail.com"
                  className="flex items-center gap-3 hover:text-gold transition-colors duration-300"
                >
                  <Mail size={18} className="text-gold flex-shrink-0" />
                  jmiskeje@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="w-full">
            <h4 className="font-serif text-lg text-white mb-4 md:mb-6">{t("newsletter.title")}</h4>
            <p className="text-ivory/70 text-sm mb-4 leading-relaxed">
              {t("newsletter.description")}
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 min-w-0 px-4 py-3 bg-white/5 border border-ivory/20 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gold text-charcoal font-medium text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors duration-300 whitespace-nowrap"
              >
                {t("newsletter.button")}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/50 text-xs">
            {t("copyright")}
          </p>
          <div className="flex gap-6 text-ivory/50 text-xs">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-gold transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
