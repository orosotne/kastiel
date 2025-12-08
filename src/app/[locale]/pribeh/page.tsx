"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import HorizontalTimeline from "@/components/interactive/HorizontalTimeline";
import MuseumGallery from "@/components/sections/MuseumGallery";
import { X, ChevronLeft, ChevronRight, Landmark, Palette, Shield, Castle, ImageIcon } from "lucide-react";

// Historické fotky pre múzejnú galériu
const historyPhotos = [
  {
    src: "/images/history/history-1.png",
    title: "Pohľad na kaštieľ",
    year: "okolo 1920",
    description: "Historický záber fasády kaštieľa z obdobia medzivojnovej republiky",
  },
  {
    src: "/images/history/history-2.png",
    title: "Nádvorie kaštieľa",
    year: "okolo 1930",
    description: "Pohľad na vnútorné nádvorie s pôvodnou dlažbou",
  },
  {
    src: "/images/history/history-3.png",
    title: "Vstupná brána",
    year: "okolo 1925",
    description: "Hlavný vstup do areálu kaštieľa s pôvodným portálom",
  },
  {
    src: "/images/history/history-4.png",
    title: "Park a okolie",
    year: "okolo 1935",
    description: "Anglický park pri kaštieli s vzácnymi drevinami",
  },
  {
    src: "/images/history/history-5.png",
    title: "Interiér sály",
    year: "okolo 1910",
    description: "Pôvodné zariadenie reprezentačnej sály",
  },
  {
    src: "/images/history/history-6.png",
    title: "Rodinný portrét",
    year: "okolo 1900",
    description: "Majitelia kaštieľa na dobovej fotografii",
  },
];

// 12 stavebných etáp kaštieľa
const buildingHistory = [
  {
    year: "15. stor.",
    period: "Gotika I.",
    title: "Prvá etapa",
    description: "Pôvodný objekt mal formu trojpodlažnej blokovej stavby. Z tohto obdobia pochádza nárožné kvádrovanie a fragment kruhovej rozety.",
    color: "gothic" as const,
  },
  {
    year: "kon. 15. stor.",
    period: "Gotika II.",
    title: "Druhá etapa",
    description: "Značný nárast stavebnej hmoty do výšky. Zachovala sa maľba s motívom Samsona prenášajúceho bránu Gazy.",
    color: "gothic" as const,
  },
  {
    year: "zač. 16. stor.",
    period: "Renesancia I.",
    title: "Tretia etapa",
    description: "Stavebný objem rozšírený pridaním nových krídel a podlaží. Zachovali sa fragmenty omietok s maľovaným vlysom.",
    color: "renaissance" as const,
  },
  {
    year: "okolo 1550",
    period: "Renesancia II.",
    title: "Štvrtá etapa",
    description: "Rozšírenie západnej časti juhovýchodného krídla. Predpokladá sa prestavaný objekt s fortifikačným charakterom.",
    color: "renaissance" as const,
  },
  {
    year: "okolo 1580",
    period: "Renesancia III.",
    title: "Piata etapa",
    description: "Kaštieľ získal zásadnú priestorovú a bastiónovú podobu. Vystavané päťboké nárožné bastióny.",
    color: "renaissance" as const,
  },
  {
    year: "okolo 1650",
    period: "Barok I.",
    title: "Šiesta etapa",
    description: "Vystavený šesťboký bastión na juhozápadnom nároží, možno nahradil starší bastión.",
    color: "baroque" as const,
  },
  {
    year: "17. stor.",
    period: "Barok II.",
    title: "Siedma etapa",
    description: "Pristavené atikové múry po celom obvode - kaštieľ získal 'hradnú' vizáž. Bohatá štuková výzdoba imitujúca Botticelliho.",
    color: "baroque" as const,
  },
  {
    year: "okolo 1730",
    period: "Barok III.",
    title: "Ôsma etapa",
    description: "Vybudovaný schodiskový trakt v strednom krídle. Štuková výzdoba a kamenné dlažby v interiéri.",
    color: "baroque" as const,
  },
  {
    year: "1794",
    period: "Luiséz",
    title: "Deviata etapa",
    description: "Dokumentovaná nálezom niky pre kachľovú pec a štukovou kartušou s nápisom 'AD RENOVAT 1794'.",
    color: "baroque" as const,
  },
  {
    year: "19. stor.",
    period: "Historizmus",
    title: "Desiata etapa",
    description: "Kaštieľ získal romantizujúci vzhľad úpravou atikových múrov a novou drevenou konštrukciou krovu.",
    color: "modern" as const,
  },
  {
    year: "1903",
    period: "Hospodárska",
    title: "Jedenásta etapa",
    description: "Objekt adaptovaný na hospodárske účely - celé severozápadné krídlo prestavané na sýpku.",
    color: "modern" as const,
  },
  {
    year: "70.-80. roky",
    period: "Konzervačná",
    title: "Dvanásta etapa",
    description: "Konzervačné a neúplné rekonštrukčné práce. Práce boli zastavené po roku 1989.",
    color: "modern" as const,
  },
];

// Zaujímavosti z histórie
const highlights = [
  {
    icon: Palette,
    title: "Gotická maľba Samsona",
    description: "V interiéri sa zachoval fragment nástenného obrazu s biblickým motívom Samsona prenášajúceho bránu Gazy z konca 15. storočia.",
  },
  {
    icon: Palette,
    title: "Botticelliho inšpirácia",
    description: "V šesťbokom bastióne sa nachádza klenba so štukovou výzdobou, ktorej stred pôvodne niesol maliarsku kompozíciu imitujúcu Zrodenie Venuše.",
  },
  {
    icon: Castle,
    title: "Hradná vizáž",
    description: "V 17. storočí boli pridané atikové múry po celom obvode, ktoré kaštieľu dodali charakteristickú 'hradnú' podobu.",
  },
  {
    icon: Shield,
    title: "Fortifikačný charakter",
    description: "Obvodové múry mali obranný charakter a slúžili na ochranu dvora. Päťboké bastióny poskytovali strategickú výhodu.",
  },
];

// Majitelia kaštieľa
const owners = [
  { period: "12. stor.", name: "Nitrianska kapitula", desc: "Pôvodný vlastník obce Bošany", hasImage: false, image: "" },
  { period: "13.-18. stor.", name: "Rod Bošániovcov", desc: "Hlavná vetva vlastníkov kaštieľa", hasImage: true, image: "/images/bosaniovci.png" },
  { period: "od 1710", name: "Ruttkayovci", desc: "Po predaji vdovou Annou Esterházyovou", hasImage: false, image: "" },
  { period: "1864", name: "Adolf Schmitt", desc: "Priemyselník, odkúpil kaštieľ", hasImage: true, image: "/images/schmitt.jpg" },
  { period: "1865", name: "Július Bischofshausen", desc: "Barón, kúpil časť majetku", hasImage: false, image: "" },
  { period: "1906-1944", name: "Ladislav Salzberger", desc: "Posledný významný vlastník veľkostatku", hasImage: false, image: "" },
];

export default function StoryPage() {
  const t = useTranslations("story");
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  
  // Owner modal state
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<typeof owners[0] | null>(null);
  
  const openOwnerModal = (owner: typeof owners[0]) => {
    setSelectedOwner(owner);
    setOwnerModalOpen(true);
  };
  const totalImages = 62;
  const initialDisplay = 8;

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/story-hero.jpeg"
      />

      {/* Historical Photos Museum Gallery */}
      <MuseumGallery
        photos={historyPhotos}
        title="Historické skvosty"
        subtitle="Vzácne fotografické dokumenty z archívu kaštieľa zachytávajúce jeho minulosť"
      />

      {/* Horizontal Timeline Section */}
      <section className="py-24 md:py-32 bg-cream overflow-hidden">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                Stavebný vývoj
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Časový prierez histórie kaštieľa
            </h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto">
              12 stavebných etáp od gotických základov po modernú dobu
            </p>
          </FadeInOnScroll>
        </div>
        
        <HorizontalTimeline events={buildingHistory} />
      </section>

      {/* Highlights Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                Objavy
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Zaujímavosti z histórie
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-cream p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                      <Icon size={28} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-charcoal mb-3">
                      {item.title}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Owners Section */}
      <section className="py-24 md:py-32 bg-charcoal text-white">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                Dedičstvo
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Majitelia kaštieľa
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Od stredovekej šľachty po moderných priemyselníkov
            </p>
          </FadeInOnScroll>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gold/30 transform md:-translate-x-1/2" />

            <div className="space-y-8">
              {owners.map((owner, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                      <span className="text-gold font-medium">{owner.period}</span>
                      
                      {owner.hasImage ? (
                        <motion.button
                          onClick={() => openOwnerModal(owner)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group flex items-center gap-3 mt-1 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                        >
                          <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors duration-300">
                            {owner.name}
                          </h3>
                          <span className="flex items-center gap-1 px-3 py-1 bg-gold/20 text-gold text-xs uppercase tracking-wider rounded-full group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                            <ImageIcon size={14} />
                            Zobraziť foto
                          </span>
                        </motion.button>
                      ) : (
                        <h3 className="font-serif text-xl mt-1">{owner.name}</h3>
                      )}
                      
                      <p className="text-white/60 text-sm mt-1">{owner.desc}</p>
                    </div>
                    
                    <div className="absolute left-4 md:relative md:left-0 w-4 h-4 bg-gold rounded-full shadow-lg z-10" />
                    
                    <div className="flex-1 hidden md:block" />
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <FadeInOnScroll className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                Pred obnovou
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Z ruín k životu
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
              Fotodokumentácia stavu kaštieľa pred začiatkom obnovy — svedectvo o rokoch chátrania a zároveň dôkaz odhodlania vrátiť mu bývalú slávu
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: showAll ? totalImages : initialDisplay }, (_, i) => i + 1).map((i) => (
              <FadeInOnScroll key={i} delay={Math.min(i * 0.05, 0.3)}>
                <motion.div 
                  className="relative aspect-square overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(i - 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={`/images/gallery/analysis-${i}.png`}
                    alt={`Analytická sonda ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium tracking-wide">
                      Zväčšiť
                    </span>
                  </div>
                </motion.div>
              </FadeInOnScroll>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {!showAll && (
            <FadeInOnScroll className="text-center mt-10">
              <motion.button
                onClick={() => setShowAll(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
              >
                Zobraziť všetky fotky ({totalImages})
              </motion.button>
            </FadeInOnScroll>
          )}
          
          {showAll && (
            <FadeInOnScroll className="text-center mt-10">
              <motion.button
                onClick={() => setShowAll(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-charcoal/30 text-charcoal font-medium uppercase tracking-wider text-sm hover:bg-charcoal/5 transition-colors duration-300"
              >
                Zobraziť menej
              </motion.button>
            </FadeInOnScroll>
          )}
        </div>
      </section>

      {/* Owner Photo Modal */}
      <AnimatePresence>
        {ownerModalOpen && selectedOwner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setOwnerModalOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setOwnerModalOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Zavrieť"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-charcoal rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={selectedOwner.image}
                  alt={selectedOwner.name}
                  fill
                  className="object-contain bg-black"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="p-6 md:p-8 text-center">
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                  {selectedOwner.name}
                </h3>
                <p className="text-white/60">
                  {selectedOwner.desc}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-gold text-sm">{selectedOwner.period}</span>
                  <span className="w-1 h-1 bg-gold/50 rounded-full" />
                  <span className="text-white/40 text-sm">Historická fotografia</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Zavrieť"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 md:left-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Predchádzajúci"
            >
              <ChevronLeft className="text-white" size={28} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Nasledujúci"
            >
              <ChevronRight className="text-white" size={28} />
            </button>

            {/* Image container */}
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/images/gallery/analysis-${currentImage + 1}.png`}
                alt={`Analytická sonda ${currentImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-wider">
              {currentImage + 1} / {totalImages}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



