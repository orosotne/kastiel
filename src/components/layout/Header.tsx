"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useScroll } from "@/hooks/useScroll";

export default function Header() {
  const isScrolled = useScroll(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = useMemo(() => [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/pribeh`, label: t("story") },
    { href: `/${locale}/svadby`, label: t("weddings") },
    { href: `/${locale}/galeria`, label: t("gallery") },
    { href: `/${locale}/kontakt`, label: t("contact") },
  ], [locale, t]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-[36px] md:top-[44px] left-0 right-0 z-50 transition-all duration-500 
          before:content-[''] before:absolute before:left-0 before:right-0 before:-top-[36px] before:h-[36px] md:before:-top-[44px] md:before:h-[44px] before:transition-all before:duration-500
          ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm py-4 before:bg-cream/95 before:backdrop-blur-md"
            : "bg-transparent py-6 before:bg-transparent"
        }`}
      >
        <div className="container-custom relative flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-10 block hover:scale-[1.02] transition-transform duration-300">
            <Image
              src="/kastiel-bosany-logo.svg"
              alt="Kaštieľ Bošany - In Integrum"
              width={240}
              height={80}
              className={`h-16 md:h-[72px] w-auto transition-all duration-300 ${
                isScrolled ? "brightness-0" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-wider transition-colors duration-300 hover:text-gold ${
                  isScrolled ? "text-charcoal" : "text-white"
                } ${pathname === link.href ? "text-gold" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4 relative z-10">
            <LanguageSwitcher isScrolled={isScrolled} />
            
            <Link
              href={`/${locale}/kontakt`}
              className={`hidden md:inline-flex items-center px-6 py-2.5 text-sm uppercase tracking-wider transition-all duration-300 ${
                isScrolled
                  ? "bg-gold text-charcoal hover:bg-gold-dark"
                  : "bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20"
              }`}
            >
              {t("reserve")}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isScrolled ? "text-charcoal" : "text-white"
              }`}
              aria-label={isMenuOpen ? t("close_menu") : t("open_menu")}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-slate-castle"
            id="mobile-menu"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-serif text-3xl md:text-4xl text-white hover:text-gold transition-colors duration-300 ${
                      pathname === link.href ? "text-gold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  href={`/${locale}/kontakt`}
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary"
                >
                  {t("reserve")}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



