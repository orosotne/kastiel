"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type LightboxImage = { src: string; alt?: string };

/**
 * Lightbox — accessible, fullscreen image overlay. Controlled: the caller owns
 * open/index state (pairs with the `useLightbox` hook). Replaces the lightbox
 * overlay markup that was copy-pasted across 5 components.
 *
 * Accessibility:
 * - role="dialog" + aria-modal, focuses the panel on open
 * - Escape closes; ArrowLeft/ArrowRight navigate
 * - backdrop click closes; controls have aria-labels
 * Edge cases: renders nothing when closed or empty; hides prev/next for a
 * single image; counter only shown for 2+ images.
 */
type Labels = { close: string; previous: string; next: string; image: string };

const DEFAULT_LABELS: Labels = {
  close: "Close",
  previous: "Previous",
  next: "Next",
  image: "Image",
};

export function Lightbox({
  images,
  index,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSelect,
  showThumbnails = false,
  labels,
}: {
  images: LightboxImage[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  /** Jump straight to an index (enables the thumbnail dot strip). */
  onSelect?: (index: number) => void;
  showThumbnails?: boolean;
  labels?: Partial<Labels>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const l = { ...DEFAULT_LABELS, ...labels };
  const hasMany = images.length > 1;

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const current = images[Math.max(0, Math.min(index, images.length - 1))];

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (hasMany && e.key === "ArrowRight") onNext();
        if (hasMany && e.key === "ArrowLeft") onPrev();
      }}
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/95 outline-none"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={l.close}
        className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20 md:right-6 md:top-6"
      >
        <X className="text-white" size={24} />
      </button>

      {hasMany && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label={l.previous}
          className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20 md:left-8"
        >
          <ChevronLeft className="text-white" size={28} />
        </button>
      )}

      <div
        className="relative h-[85vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt ?? ""}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      {hasMany && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label={l.next}
          className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20 md:right-8"
        >
          <ChevronRight className="text-white" size={28} />
        </button>
      )}

      {hasMany && (
        <div
          className={cn(
            "absolute bottom-6 left-1/2 -translate-x-1/2",
            "text-sm font-medium tracking-wider text-white/70"
          )}
        >
          {index + 1} / {images.length}
        </div>
      )}

      {showThumbnails && onSelect && hasMany && (
        <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(i);
              }}
              aria-label={`${l.image} ${i + 1}`}
              aria-current={i === index || undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
