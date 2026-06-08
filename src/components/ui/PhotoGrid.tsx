"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Skeleton } from "./Skeleton";
import { Button } from "./Button";
import { Lightbox } from "./Lightbox";
import FadeInOnScroll from "@/components/interactive/FadeInOnScroll";
import { useLightbox } from "@/hooks/useLightbox";

export type Photo = { src: string; alt?: string };

type Columns = 2 | 3 | 4;

export type PhotoGridLabels = {
  showMore: (remaining: number) => string;
  showLess: string;
  empty: string;
  close: string;
  previous: string;
  next: string;
  image: string;
};

const DEFAULT_LABELS: PhotoGridLabels = {
  showMore: (n) => `Show more (${n})`,
  showLess: "Show less",
  empty: "No photos to show yet.",
  close: "Close",
  previous: "Previous",
  next: "Next",
  image: "Image",
};

// Static class maps so Tailwind can see every class at build time.
const COLUMN_CLASSES: Record<Columns, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

const DEFAULT_SIZES: Record<Columns, string> = {
  2: "(max-width: 768px) 50vw, 50vw",
  3: "(max-width: 768px) 50vw, 33vw",
  4: "(max-width: 768px) 50vw, 25vw",
};

/**
 * PhotoGrid — responsive image grid with progressive disclosure (show more /
 * show less), built-in loading skeletons, an empty state, and an accessible
 * lightbox. Replaces three separate gallery implementations (galeria, pribeh,
 * MuseumGallery) that each re-built slice + show-more + lightbox by hand.
 *
 * States handled:
 * - loading  → `isLoading` renders `loadingCount` shimmering skeletons
 * - empty    → `photos.length === 0` renders `emptyState` (or a default)
 * - partial  → more than `initialCount` photos → "show more/less" toggle
 * - single   → lightbox auto-hides prev/next and the counter
 */
export function PhotoGrid({
  photos,
  initialCount = 8,
  columns = 4,
  isLoading = false,
  loadingCount,
  emptyState,
  enableLightbox = true,
  hoverLabel,
  showThumbnails = false,
  revealOnScroll = false,
  sizes,
  labels,
  className,
}: {
  photos: Photo[];
  initialCount?: number;
  columns?: Columns;
  isLoading?: boolean;
  loadingCount?: number;
  emptyState?: React.ReactNode;
  enableLightbox?: boolean;
  /** Optional hint shown over a tile on hover (e.g. "Zoom"). */
  hoverLabel?: string;
  /** Show the lightbox thumbnail dot strip (best for small galleries). */
  showThumbnails?: boolean;
  /** Reveal tiles with a staggered fade as they scroll into view. */
  revealOnScroll?: boolean;
  sizes?: string;
  labels?: Partial<PhotoGridLabels>;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const lightbox = useLightbox(photos.length);
  const l = { ...DEFAULT_LABELS, ...labels };

  const gridClass = cn(
    "grid gap-4",
    COLUMN_CLASSES[columns],
    className
  );
  const resolvedSizes = sizes ?? DEFAULT_SIZES[columns];

  // 1. Loading
  if (isLoading) {
    const count = loadingCount ?? initialCount;
    return (
      <div className={gridClass} aria-busy="true" aria-live="polite">
        {Array.from({ length: count }, (_, i) => (
          <Skeleton key={i} className="aspect-square w-full" />
        ))}
      </div>
    );
  }

  // 2. Empty
  if (photos.length === 0) {
    if (emptyState) return <>{emptyState}</>;
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-charcoal/50">
        <ImageOff size={40} aria-hidden />
        <p className="text-sm">{l.empty}</p>
      </div>
    );
  }

  // 3. Content
  const displayed = expanded ? photos : photos.slice(0, initialCount);
  const hasMore = photos.length > initialCount;
  const remaining = photos.length - initialCount;

  return (
    <>
      <ul className={gridClass} role="list">
        {displayed.map((photo, i) => {
          const tileInner = (
            <>
              <Image
                src={photo.src}
                alt={photo.alt ?? ""}
                fill
                sizes={resolvedSizes}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {hoverLabel && (
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30">
                  <span className="text-sm font-medium tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {hoverLabel}
                  </span>
                </span>
              )}
            </>
          );

          const tileClasses = "group relative block aspect-square w-full overflow-hidden";
          const tile = enableLightbox ? (
            <button
              type="button"
              onClick={() => lightbox.openAt(i)}
              aria-label={photo.alt || `Photo ${i + 1}`}
              className={cn(
                tileClasses,
                "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              )}
            >
              {tileInner}
            </button>
          ) : (
            <div className={tileClasses}>{tileInner}</div>
          );

          return (
            <li key={photo.src}>
              {revealOnScroll ? (
                <FadeInOnScroll delay={Math.min(i * 0.05, 0.3)}>{tile}</FadeInOnScroll>
              ) : (
                tile
              )}
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="primary"
            onClick={() => setExpanded((v) => !v)}
            leftIcon={expanded ? <Minus size={18} /> : <Plus size={18} />}
            aria-expanded={expanded}
          >
            {expanded ? l.showLess : l.showMore(remaining)}
          </Button>
        </div>
      )}

      {enableLightbox && (
        <Lightbox
          images={photos}
          index={lightbox.index}
          isOpen={lightbox.isOpen}
          onClose={lightbox.close}
          onNext={lightbox.next}
          onPrev={lightbox.prev}
          onSelect={lightbox.setIndex}
          showThumbnails={showThumbnails}
          labels={{ close: l.close, previous: l.previous, next: l.next, image: l.image }}
        />
      )}
    </>
  );
}
