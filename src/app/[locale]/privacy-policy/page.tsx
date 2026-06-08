"use client";

import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { Shield, Database, Cookie, UserCheck, Mail, Building2 } from "lucide-react";
import { BRAND, CONTACT } from "@/lib/site-config";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  const sections = [
    {
      icon: Building2,
      title: t("operator"),
      content: (
        <div className="space-y-2">
          <p><strong>{t("label_name")}:</strong> {BRAND}</p>
          <p><strong>IČO:</strong> {CONTACT.ico}</p>
          <p><strong>DIČ:</strong> {CONTACT.dic}</p>
          <p><strong>{t("label_seat")}:</strong> {CONTACT.address.street}, {CONTACT.address.postalCode} {CONTACT.address.city}</p>
          <p><strong>{t("label_email")}:</strong> {CONTACT.email}</p>
          <p><strong>{t("label_phone")}:</strong> {CONTACT.phone}</p>
        </div>
      ),
    },
    {
      icon: Database,
      title: t("data_collected"),
      content: (
        <ul className="list-disc list-inside space-y-2">
          {(t.raw("data_items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      icon: Shield,
      title: t("purpose"),
      content: (
        <ul className="list-disc list-inside space-y-2">
          {(t.raw("purpose_items") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      icon: Cookie,
      title: t("cookies_title"),
      content: (
        <div className="space-y-2">
          <p>{t("cookies_intro")}</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {(t.raw("cookies_items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-2">{t("cookies_note")}</p>
        </div>
      ),
    },
    {
      icon: UserCheck,
      title: t("your_rights"),
      content: (
        <div className="space-y-2">
          <p>{t("rights_intro")}</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {(t.raw("rights_items") as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      icon: Mail,
      title: t("contact"),
      content: (
        <div className="space-y-2">
          <p>{t("contact_intro")}</p>
          <p className="mt-2"><strong>{t("label_email")}:</strong> {CONTACT.email}</p>
          <p><strong>{t("label_phone")}:</strong> {CONTACT.phone}</p>
          <p><strong>{t("label_address")}:</strong> {BRAND}, {CONTACT.address.street}, {CONTACT.address.postalCode} {CONTACT.address.city}</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHero
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        backgroundImage="/images/story-hero.webp"
      />

      <section className="py-24 md:py-32 bg-cream">
        <div className="container-custom max-w-4xl">
          <FadeInOnScroll>
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-charcoal/70 text-lg leading-relaxed">
                {t("intro")}
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
                {t("last_updated")}
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}

