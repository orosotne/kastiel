"use client";

import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { Shield, Database, Cookie, UserCheck, Mail, Building2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  const sections = [
    {
      icon: Building2,
      title: "Prevádzkovateľ",
      content: (
        <div className="space-y-2">
          <p><strong>Názov:</strong> IN INTEGRUM</p>
          <p><strong>IČO:</strong> 42024757</p>
          <p><strong>DIČ:</strong> 2022449737</p>
          <p><strong>Sídlo:</strong> SNP 113/1, 956 18 Bošany</p>
          <p><strong>Email:</strong> jmiskeje@gmail.com</p>
          <p><strong>Telefón:</strong> +421 907 726 726</p>
        </div>
      ),
    },
    {
      icon: Database,
      title: "Aké údaje zbierame",
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Meno a priezvisko (pri kontaktnom formulári)</li>
          <li>Email adresa (pri kontaktnom formulári a newsletter)</li>
          <li>Telefónne číslo (voliteľné, pri dopytoch)</li>
          <li>Obsah správy (pri kontaktnom formulári)</li>
          <li>Technické údaje (IP adresa, typ prehliadača - automaticky)</li>
        </ul>
      ),
    },
    {
      icon: Shield,
      title: "Účel spracovania",
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Odpoveď na vaše dopyty a otázky</li>
          <li>Spracovanie rezervácií a objednávok</li>
          <li>Zasielanie newslettera (len s vaším súhlasom)</li>
          <li>Zlepšovanie našich služieb</li>
          <li>Plnenie zákonných povinností</li>
        </ul>
      ),
    },
    {
      icon: Cookie,
      title: "Cookies",
      content: (
        <div className="space-y-2">
          <p>Naša webová stránka používa cookies pre:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Nevyhnutné fungovanie stránky</li>
            <li>Zapamätanie jazykových preferencií</li>
            <li>Analytické účely (anonymné štatistiky návštevnosti)</li>
          </ul>
          <p className="mt-2">Používaním tejto stránky súhlasíte s použitím cookies.</p>
        </div>
      ),
    },
    {
      icon: UserCheck,
      title: "Vaše práva",
      content: (
        <div className="space-y-2">
          <p>Podľa GDPR máte právo:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Na prístup k svojim osobným údajom</li>
            <li>Na opravu nesprávnych údajov</li>
            <li>Na vymazanie údajov („právo byť zabudnutý")</li>
            <li>Na obmedzenie spracovania</li>
            <li>Na prenosnosť údajov</li>
            <li>Namietať proti spracovaniu</li>
            <li>Odvolať súhlas so spracovaním</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Mail,
      title: "Kontakt",
      content: (
        <div className="space-y-2">
          <p>Pre uplatnenie vašich práv alebo otázky ohľadom ochrany osobných údajov nás kontaktujte:</p>
          <p className="mt-2"><strong>Email:</strong> jmiskeje@gmail.com</p>
          <p><strong>Telefón:</strong> +421 907 726 726</p>
          <p><strong>Adresa:</strong> IN INTEGRUM, SNP 113/1, 956 18 Bošany</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHero
        title="Ochrana osobných údajov"
        subtitle="GDPR a zásady ochrany súkromia"
        backgroundImage="/images/story-hero.jpeg"
      />

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-charcoal/70 text-lg leading-relaxed">
                Ochrana vašich osobných údajov je pre nás dôležitá. Táto stránka vysvetľuje, 
                ako zhromažďujeme, používame a chránime vaše osobné údaje v súlade s nariadením 
                GDPR (General Data Protection Regulation).
              </p>
            </div>
          </FadeInOnScroll>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="text-gold" size={24} />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl text-charcoal mb-4">
                          {section.title}
                        </h2>
                        <div className="text-charcoal/70">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>

          <FadeInOnScroll delay={0.6}>
            <div className="mt-12 p-6 bg-gold/10 rounded-xl border border-gold/20">
              <p className="text-charcoal/70 text-sm text-center">
                Posledná aktualizácia: December 2024
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}

