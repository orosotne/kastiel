"use client";

import { useTranslations, useLocale } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { Shield, Database, Cookie, UserCheck, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");
  const locale = useLocale();

  const sections = [
    {
      icon: Shield,
      title: t("sections.controller.title"),
      content: t("sections.controller.content"),
    },
    {
      icon: Database,
      title: t("sections.data.title"),
      content: t("sections.data.content"),
    },
    {
      icon: Cookie,
      title: t("sections.cookies.title"),
      content: t("sections.cookies.content"),
    },
    {
      icon: UserCheck,
      title: t("sections.rights.title"),
      content: t("sections.rights.content"),
    },
    {
      icon: Mail,
      title: t("sections.contact.title"),
      content: t("sections.contact.content"),
    },
  ];

  return (
    <>
      <PageHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        backgroundImage="/images/contact-hero.jpg"
      />

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {t("intro")}
                </p>
                <p className="text-charcoal/50 text-sm mt-4">
                  {t("lastUpdated")}: 7. december 2024
                </p>
              </div>
            </FadeInOnScroll>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <div className="bg-white p-8 md:p-10 shadow-lg">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <section.icon className="text-gold" size={24} />
                      </div>
                      <h2 className="font-serif text-2xl text-charcoal pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <div className="text-charcoal/70 leading-relaxed whitespace-pre-line pl-16">
                      {section.content}
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>

            {/* OZ Info Box */}
            <FadeInOnScroll delay={0.5}>
              <div className="mt-16 bg-slate-castle text-white p-8 md:p-10">
                <h3 className="font-serif text-xl mb-4">
                  {t("ozInfo.title")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
                  <div>
                    <span className="text-gold">{t("ozInfo.name")}:</span> IN INTEGRUM
                  </div>
                  <div>
                    <span className="text-gold">IČO:</span> 42024757
                  </div>
                  <div>
                    <span className="text-gold">DIČ:</span> 2022449737
                  </div>
                  <div>
                    <span className="text-gold">{t("ozInfo.address")}:</span> SNP 113/1, 956 18 Bošany
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gold">Email:</span>{" "}
                    <a href="mailto:jmiskeje@gmail.com" className="hover:text-gold transition-colors">
                      jmiskeje@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}

