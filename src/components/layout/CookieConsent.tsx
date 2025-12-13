"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  const t = useTranslations("cookies");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-slate-castle/95 backdrop-blur text-white shadow-lg border-t border-gold/20"
      >
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm md:text-base text-center md:text-left">
            <p>
              {t("text")}{" "}
              <Link href="/privacy-policy" className="underline hover:text-gold transition-colors">
                {t("more_info")}
              </Link>.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-gold text-charcoal text-sm font-semibold uppercase tracking-wider hover:bg-gold-dark transition-colors"
            >
              {t("accept")}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:text-gold transition-colors"
              aria-label={t("close")}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
