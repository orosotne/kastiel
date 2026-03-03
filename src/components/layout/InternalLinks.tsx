"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

interface InternalLinkItem {
  href: string;
  labelKey: string;
}

interface InternalLinksProps {
  links: InternalLinkItem[];
}

export default function InternalLinks({ links }: InternalLinksProps) {
  const t = useTranslations("common");
  const nav = useTranslations("navigation");
  const locale = useLocale();

  return (
    <section className="py-16 md:py-24 bg-cream border-t border-charcoal/5">
      <div className="container-custom">
        <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-8">
          {t("discover_more")}
        </h3>
        <div className="flex flex-wrap gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors duration-300 group"
            >
              <span className="font-medium">{nav(link.labelKey)}</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
