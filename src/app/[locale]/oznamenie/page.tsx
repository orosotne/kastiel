"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { AlertTriangle, Heart, Building2, FileText, X, ZoomIn } from "lucide-react";

export default function OznameniePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <PageHero
        title="Oficiálne stanovisko"
        subtitle={<>K <span className="text-red-500 font-bold">nepodporeniu</span> projektu Kaštieľ Bošany</>}
        backgroundImage="/images/story-hero.jpeg"
      />

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={32} className="text-red-700" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal">
                  Dôležité oznámenie
                </h2>
                <p className="text-charcoal/60">December 2025</p>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="bg-red-50 border-l-4 border-red-700 p-6 md:p-8 mb-12">
              <p className="text-lg md:text-xl text-charcoal leading-relaxed mb-4">
                S úprimnou ľútosťou oznamujeme, že náš projekt{" "}
                <strong>&quot;Kaštieľ Bošany – brána kultúry a cestovného ruchu Stredného Ponitria&quot;</strong>{" "}
                nebol podporený v rámci grantového programu Ministerstva cestovného ruchu a športu SR.
              </p>
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-medium text-sm transition-colors"
              >
                <FileText size={16} />
                Zobraziť zamietavé stanovisko
              </button>
            </div>
          </FadeInOnScroll>

          {/* O nás */}
          <FadeInOnScroll delay={0.2}>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={24} className="text-gold" />
                <h3 className="font-serif text-xl text-charcoal">O občianskom združení In Integrum</h3>
              </div>
              <p className="text-charcoal/80 leading-relaxed mb-4">
                Naše občianske združenie bolo založené v roku <strong>2007</strong>. Jeho názov v latinčine znamená 
                <em> „znovuzrodenie"</em> alebo <em>„návrat do pôvodného stavu"</em>. Už <strong>sedemnásty rok</strong> sa 
                kontinuálne venujeme obnove národnej kultúrnej pamiatky – Renesančného kaštieľa v Bošanoch.
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Hlavné stanovisko */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-sm uppercase tracking-[0.2em] text-gold">
                Naše stanovisko
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-charcoal/80 leading-relaxed mb-6">
                S úprimnou ľútosťou sme prijali rozhodnutie o nepodporení nášho projektu, a to napriek 
                jeho <strong>veľmi priaznivému odbornému hodnoteniu</strong> zo strany odborných hodnotiteľov MCRS. 
                Rozhodnutie s veľkým sklamaním rešpektujeme, hoci nás mrzí o to viac, že odborný prínos 
                projektu bol posúdený veľmi pozitívne.
              </p>

              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-charcoal/10 my-8">
                <p className="text-charcoal/80 leading-relaxed italic font-serif text-lg">
                  „Zároveň si dovoľujeme deklarovať, že v našej činnosti budeme pokračovať aj naďalej. 
                  Obnova kaštieľa je pre nás dlhodobým a už i morálnym záväzkom samým pred sebou a vôbec 
                  nie zdrojom príjmov. Tento náš morálny aspekt dotiahnuť dielo dokonca a nielen zvonku 
                  ale i zvnútra, presahuje jednotlivé grantové výzvy, či akékoľvek administratívne rozhodnutia."
                </p>
              </div>

              <p className="text-charcoal/80 leading-relaxed mb-6">
                Úprimne musíme konštatovať, že horkosť tohto rozhodnutia, ktoré sme naozaj po 17 rokoch 
                maximálnej snahy a supľovania štátu vo veľa veciach neočakávali, musíme najskôr prekonať, 
                lebo pocit krivdy ešte neodznel.
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Systémový problém */}
      <section className="py-16 md:py-24 bg-charcoal text-white">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
              Systémový problém podpory pamiatok
            </h2>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                Dovoľujeme si poukázať na dlhodobejší systémový problém. Už približne <strong className="text-gold">dve desaťročia</strong> nie 
                sú podporované nehnuteľné kultúrne pamiatky v súkromnom vlastníctve, ktoré nie sú vo vlastníctve 
                štátu, cirkví, vyšších územných celkov, miest či obcí – a to napriek rastúcemu záujmu verejnosti 
                o návštevnosť takýchto objektov a teda ich jednoznačnému potenciálu a prínosu v oblasti kultúry, 
                turizmu a cestovného ruchu.
              </p>

              <p>
                Projekty z Ministerstva kultúry cez &quot;Obnovme si svoj dom&quot; sú jedným slovom veľmi <em>chabé</em> a 
                sú veľmi drobené, čoho výsledkom je skôr &quot;lepenie dier&quot; ako príprava či prezentácia krásy 
                a dominancie historických skvostov, ktorými na Slovensku disponujeme.
              </p>

              <div className="bg-white/10 p-6 rounded-xl my-8">
                <p className="text-white/90">
                  Považujeme za potrebné zdôrazniť, že aj na Slovensku existujú iniciatívy a jednotlivci, ktorí sa – 
                  často <strong className="text-gold">výlučne z vlastných zdrojov</strong> – snažia zachraňovať pamiatky, obnovovať ich 
                  historickú hodnotu a sprístupňovať ich verejnosti formou múzeí, galérií či kultúrno-vzdelávacích 
                  aktivít, tak ako sa o to pokúša i naše občianske združenie.
                </p>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Výzva */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={40} className="text-gold" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
                Pokračujeme z vlastných zdrojov
              </h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto">
                Napriek tomuto rozhodnutiu v našej práci pokračujeme. Obnova kaštieľa je financovaná 
                výlučne zo súkromných zdrojov a z podpory ľudí, ktorým záleží na zachovaní kultúrneho dedičstva.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="bg-cream p-8 rounded-xl">
              <p className="text-charcoal/80 leading-relaxed font-serif italic text-lg text-center">
                „Zámerom tohto stanoviska nie je opätovne kritizovať ani už viacej spochybňovať prijaté rozhodnutia. 
                Našim cieľom je skôr už takto ticho, s úctou a pokorou poukázať na mieru zodpovednosti do budúcna. 
                Práve vaše rozhodnutia majú schopnosť nielen prideľovať financie, ale aj spoluurčovať, či konkrétne 
                diela s dlhodobým verejným významom dostanú šancu pokračovať, alebo zostanú odkázané výlučne na 
                osobné obete jednotlivcov."
              </p>
            </div>
          </FadeInOnScroll>

          {/* Oficiálny dokument - klikateľný */}
          <FadeInOnScroll delay={0.2}>
            <div className="mt-12">
              <h3 className="font-serif text-xl text-charcoal text-center mb-6">
                Oficiálne zamietavé stanovisko
              </h3>
              
              <motion.button
                onClick={() => setLightboxOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:border-red-300"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-red-700 rounded-full flex items-center justify-center group-hover:bg-red-800 transition-colors">
                    <FileText size={40} className="text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-charcoal text-lg mb-2">
                      Rozhodnutie MCRS
                    </p>
                    <p className="text-charcoal/60 text-sm mb-4">
                      Sken oficiálneho listu od Ministerstva cestovného ruchu a športu SR
                    </p>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 text-white text-sm font-medium rounded-full group-hover:bg-red-800 transition-colors">
                      <ZoomIn size={16} />
                      Zobraziť dokument
                    </span>
                  </div>
                </div>
              </motion.button>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-8 bg-cream border-t border-charcoal/10">
        <div className="container-custom max-w-4xl">
          <p className="text-center text-charcoal/50 text-sm">
            In Integrum, o.z. • Založené 2007 • 17 rokov obnovy Kaštieľa Bošany
          </p>
        </div>
      </section>

      {/* Lightbox pre dokument */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Zavrieť"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Document container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/zamietnutie-mcrs-2.jpg"
                alt="Zamietavé stanovisko MCRS"
                width={1200}
                height={1600}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
