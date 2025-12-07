"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Camera, Heart } from "lucide-react";
import { motion } from "framer-motion";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();

  // Nahraďte obrázky reálnymi fotkami:
  // - /images/conference-hall.jpg (konferenčná sála)
  // - /images/wedding-park.jpg (svadba v parku)
  const services = [
    {
      key: "interior",
      href: `/${locale}/galeria`,
      image: null, // placeholder
      icon: Camera,
    },
    {
      key: "exterior",
      href: `/${locale}/svadby`,
      image: null, // placeholder
      icon: Heart,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-castle">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <FadeInOnScroll
              key={service.key}
              delay={index * 0.2}
              direction={index === 0 ? "left" : "right"}
            >
              <Link href={service.href} className="group block relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  {/* Image or Placeholder */}
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={t(`${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-charcoal/60 to-slate-castle flex items-center justify-center">
                      <service.icon size={80} className="text-white/20" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">
                      {t(`${service.key}.title`)}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base mb-6 max-w-md">
                      {t(`${service.key}.description`)}
                    </p>
                    <div className="flex items-center gap-2 text-gold group-hover:text-gold-light transition-colors duration-300">
                      <span className="uppercase tracking-wider text-sm font-medium">
                        {t(`${service.key}.cta`)}
                      </span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}


