"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { AlertTriangle, ChevronRight } from "lucide-react";

export default function AnnouncementBanner() {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/oznamenie`}
      className="fixed top-0 left-0 right-0 z-[60] block bg-red-700 hover:bg-red-800 transition-colors duration-300 shadow-md"
    >
      <div className="container-custom py-2 md:py-3">
        <div className="flex items-center justify-center gap-2 md:gap-3 text-white text-xs md:text-sm">
          <AlertTriangle size={14} className="flex-shrink-0 hidden sm:block" />
          <span className="font-medium text-center">
            <span className="uppercase tracking-wider">Dôležité:</span>{" "}
            <span className="hidden sm:inline">Náš projekt nebol podporený. Pokračujeme z vlastných zdrojov.</span>
            <span className="sm:hidden">Projekt nepodporený štátom</span>
          </span>
          <ChevronRight size={14} className="flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}


