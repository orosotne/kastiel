"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, FileX } from "lucide-react";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";

export default function ChronicleSection() {
  const t = useTranslations("chronicle");
  const locale = useLocale();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <FadeInOnScroll direction="left">
            <div className="space-y-8">
              {/* Section Label */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-sm uppercase tracking-[0.2em] text-gold">
                  {t("subtitle")}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal">
                {t("title")}
              </h2>

              {/* Description */}
              <p className="text-charcoal/70 text-lg leading-relaxed">
                {t("description")}
              </p>

              {/* Grant Rejection Block */}
              <div className="bg-cream-100 p-6 md:p-8 border-l-4 border-gold">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded">
                    <FileX size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-charcoal mb-2">
                      {t("grant.title")}
                    </h4>
                    <p className="text-charcoal/60 text-sm">
                      {t("grant.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/pribeh`}
                className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors duration-300 group"
              >
                <span className="uppercase tracking-wider text-sm font-medium">
                  {t("readMore")}
                </span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </FadeInOnScroll>

          {/* Image */}
          <FadeInOnScroll direction="right" delay={0.2}>
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/chronicle-detail.jpeg"
                  alt="Detail kaštieľa"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative frame - hidden on mobile to prevent overflow */}
              <div className="hidden md:block absolute -bottom-6 -right-6 w-full h-full border-2 border-gold -z-10" />
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}


