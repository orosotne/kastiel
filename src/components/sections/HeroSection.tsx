"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Video s obrázkom ako poster/fallback - optimalizované pre rýchle načítanie */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/Hero_image.jpeg"
        >
          {/* WebM pre moderné prehliadače (menšia veľkosť) */}
          <source src="/videos/hero_video.webm" type="video/webm" />
          {/* MP4 fallback */}
          <source src="/videos/hero_video.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay pre lepšiu čitateľnosť textu */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl bg-charcoal/30 backdrop-blur-sm px-8 py-10 md:px-12 md:py-14 rounded-2xl border border-white/10"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-24 h-[1px] bg-gold mx-auto mb-8"
          />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4"
          >
            {t("title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-gold mb-8"
          >
            {t("subtitle")}
          </motion.h2>

          {/* Motto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto"
          >
            {t("motto")}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-24 h-[1px] bg-gold mx-auto mt-8"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/60 group-hover:text-gold transition-colors duration-300">
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-gold" />
        </motion.div>
      </motion.button>
    </section>
  );
}


