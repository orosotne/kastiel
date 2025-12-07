"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/pribeh`, label: t("story") },
    { href: `/${locale}/svadby`, label: t("weddings") },
    { href: `/${locale}/galeria`, label: t("gallery") },
    { href: `/${locale}/kontakt`, label: t("contact") },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-start"
            >
              <span className={`font-serif text-2xl md:text-3xl tracking-wide transition-colors duration-300 ${
                isScrolled ? "text-charcoal" : "text-white"
              }`}>
                In Integrum
              </span>
              <span className={`text-xs uppercase tracking-[0.3em] transition-colors duration-300 ${
                isScrolled ? "text-gold" : "text-gold-light"
              }`}>
                Kaštieľ Bošany
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
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
          <div className="flex items-center gap-4">
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
              aria-label="Menu"
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



