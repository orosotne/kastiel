"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineEvent {
  year: string;
  period: string;
  title: string;
  description: string;
  color: "gothic" | "renaissance" | "baroque" | "modern";
}

interface HorizontalTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
}

const colorClasses = {
  gothic: {
    bg: "bg-slate-700",
    border: "border-slate-600",
    text: "text-slate-200",
    accent: "bg-slate-500",
  },
  renaissance: {
    bg: "bg-amber-800",
    border: "border-amber-700",
    text: "text-amber-100",
    accent: "bg-gold",
  },
  baroque: {
    bg: "bg-rose-900",
    border: "border-rose-800",
    text: "text-rose-100",
    accent: "bg-rose-600",
  },
  modern: {
    bg: "bg-renaissance-green",
    border: "border-green-700",
    text: "text-green-100",
    accent: "bg-green-500",
  },
};

export default function HorizontalTimeline({
  events,
  title,
  subtitle,
}: HorizontalTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-charcoal/60 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      {/* Navigation Arrows - hidden on mobile, visible on md+ */}
      <button
        onClick={() => scroll("left")}
        className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gold text-charcoal hover:text-white rounded-full shadow-lg items-center justify-center transition-all duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => scroll("right")}
        className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gold text-charcoal hover:text-white rounded-full shadow-lg items-center justify-center transition-all duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>

      {/* Timeline Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto scrollbar-hide px-8 md:px-16 pb-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="relative min-w-max">
          {/* Timeline Line */}
          <div className="absolute top-[60px] left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-gold to-renaissance-green" />

          {/* Events */}
          <div className="flex gap-6">
            {events.map((event, index) => {
              const colors = colorClasses[event.color];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center w-[280px] flex-shrink-0"
                >
                  {/* Year Badge */}
                  <div
                    className={`${colors.accent} text-white font-bold px-4 py-2 rounded-full text-sm mb-4 shadow-md`}
                  >
                    {event.year}
                  </div>

                  {/* Timeline Dot */}
                  <div
                    className={`w-5 h-5 rounded-full ${colors.accent} border-4 border-white shadow-lg z-10`}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`mt-6 p-5 rounded-xl ${colors.bg} ${colors.border} border-2 shadow-xl w-full cursor-default`}
                  >
                    <span
                      className={`text-xs uppercase tracking-wider ${colors.text} opacity-70`}
                    >
                      {event.period}
                    </span>
                    <h3 className={`font-serif text-lg ${colors.text} mt-1 mb-2`}>
                      {event.title}
                    </h3>
                    <p className={`text-sm ${colors.text} opacity-80 leading-relaxed`}>
                      {event.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="flex justify-center mt-6 gap-2">
        <span className="text-charcoal/40 text-sm flex items-center gap-2">
          <ChevronLeft size={16} />
          Scrollujte pre zobrazenie celej histórie
          <ChevronRight size={16} />
        </span>
      </div>
    </div>
  );
}

