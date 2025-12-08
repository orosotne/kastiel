"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, Quote } from "lucide-react";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";

// Konfigurácia - reálne články a médiá
const mediaArticles = [
  { 
    name: "Denník N", 
    logo: "/images/media/dennikn-logo.svg", 
    url: "https://dennikn.sk/minuta/4014768/",
    title: "Renesančný kaštieľ v Bošanoch by mal slúžiť ako kongresové centrum"
  },
  { 
    name: "MY Topoľčany (SME)", 
    logo: "/images/media/sme-logo.svg", 
    url: "https://my.sme.sk/topolcany/c/kastiel-pri-partizanskom-laka-nevesty-splodit-tu-mali-aj-najznamejsiu-francuzsku-kralovnu",
    title: "Historický skvost sa stane miestom nehy a ľúbosti"
  },
  { 
    name: "Hrady-Zámky.sk", 
    logo: "/images/media/logo_hradyzamkysk.svg", 
    url: "https://www.hrady-zamky.sk/bosany/",
    title: "Kaštieľ Bossányiovcov - Bošany"
  },
  { 
    name: "TopSlovensko", 
    logo: "/images/media/topslovensko.png", 
    url: "https://www.topslovensko.sk/detail/kastiel-bossanyiovcov-bosany/",
    title: "Kaštieľ Bossányiovcov je skutočným klenotom architektúry"
  },
  { 
    name: "Baťovany.sk", 
    logo: "/images/media/Batovany_SK_LOGO.png", 
    url: "https://www.batovany.sk/nase-kastiele-jeden-kastiel-nestaci-bosany-zazili-aj-navstevu-marie-terezie/",
    title: "Naše kaštiele: Jeden kaštieľ nestačí. Bošany zažili aj návštevu Márie Terézie"
  },
];

const quotes = [
  {
    text: "Renesančný kaštieľ v Bošanoch by mal v budúcnosti slúžiť ako múzeum a galéria.",
    source: "Denník N",
    year: "2024",
    url: "https://dennikn.sk/minuta/4014768/",
  },
  {
    text: "Z ruiny renesančnej pamiatky je pýcha obce. Historický skvost sa stane miestom nehy a ľúbosti.",
    source: "MY Topoľčany (SME)",
    year: "2024",
    url: "https://my.sme.sk/topolcany/c/kastiel-pri-partizanskom-laka-nevesty-splodit-tu-mali-aj-najznamejsiu-francuzsku-kralovnu",
  },
  {
    text: "Kaštieľ Bossányiovcov je skutočným klenotom slovenskej architektúry. Jeho bohatá história z neho robí jedinečnú pamiatku.",
    source: "TopSlovensko",
    year: "2024",
    url: "https://www.topslovensko.sk/detail/kastiel-bossanyiovcov-bosany/",
  },
];

// YouTube videá - DOPLŇTE VAŠE VIDEO ID
// Video ID nájdete v URL: youtube.com/watch?v=TOTO_JE_ID
const videos = [
  {
    id: "arL-EVg6pTk",
    title: "Kaštieľ Bošany - Príbeh obnovy",
    thumbnail: "https://img.youtube.com/vi/arL-EVg6pTk/hqdefault.jpg",
  },
  {
    id: "5CDCSOyiJCA",
    title: "Pôvodný stav kaštieľa",
    thumbnail: "https://img.youtube.com/vi/5CDCSOyiJCA/hqdefault.jpg",
  },
  {
    id: "m1FU5n-mmKk",
    title: "Svadba v kaštieli Bošany",
    thumbnail: "https://img.youtube.com/vi/m1FU5n-mmKk/hqdefault.jpg",
  },
];

// Pre zobrazenie len textových názvov médií namiesto log
// Zmeňte na FALSE keď nahráte logá do public/images/media/
const useTextLogos = false;

export default function MediaSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeQuote, setActiveQuote] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <FadeInOnScroll className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-sm uppercase tracking-[0.2em] text-gold">
              Press & Media
            </span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal">
            Hovoria o nás
          </h2>
        </FadeInOnScroll>

        {/* Quotes Carousel */}
        <FadeInOnScroll delay={0.1} className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="text-gold/30 w-16 h-16 mx-auto mb-6 rotate-180" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="font-serif text-2xl md:text-3xl text-charcoal mb-6 leading-relaxed">
                  &ldquo;{quotes[activeQuote].text}&rdquo;
                </blockquote>
                <cite className="text-charcoal/60 not-italic">
                  — {quotes[activeQuote].source}, {quotes[activeQuote].year}
                </cite>
              </motion.div>
            </AnimatePresence>

            {/* Quote Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveQuote(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeQuote
                      ? "bg-gold scale-110"
                      : "bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                  aria-label={`Citát ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeInOnScroll>

        {/* Media Articles */}
        <FadeInOnScroll delay={0.2} className="mb-20">
          <p className="text-center text-charcoal/50 text-sm uppercase tracking-wider mb-8">
            Písali o nás
          </p>
          
          {useTextLogos ? (
            // Textové zobrazenie - názvy médií ako linky
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {mediaArticles.map((media, index) => (
                <motion.a
                  key={media.name}
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/40 hover:text-gold font-serif text-lg md:text-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  title={media.title}
                >
                  {media.name}
                </motion.a>
              ))}
            </div>
          ) : (
            // Logá médií
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {mediaArticles.map((media, index) => (
                <motion.a
                  key={media.name}
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Image
                    src={media.logo}
                    alt={media.name}
                    width={120}
                    height={40}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </motion.a>
              ))}
            </div>
          )}
        </FadeInOnScroll>

        {/* Video Section */}
        <FadeInOnScroll delay={0.3}>
          <p className="text-center text-charcoal/50 text-sm uppercase tracking-wider mb-8">
            Video reportáže
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="relative aspect-video bg-slate-castle/10 overflow-hidden cursor-pointer group"
                onClick={() => setActiveVideo(video.id)}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                {/* Thumbnail */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/50 transition-colors duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="text-charcoal ml-1" size={28} fill="currentColor" />
                  </div>
                </div>
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
                  <p className="text-white text-sm font-medium">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </FadeInOnScroll>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors duration-300"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

