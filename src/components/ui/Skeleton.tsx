import { cn } from "@/lib/cn";

/**
 * Skeleton — a single shimmering placeholder block for loading states.
 * Decorative (aria-hidden); wrap a group in an element with `aria-busy` /
 * `aria-live="polite"` if you need to announce loading to screen readers.
 * Server-Component friendly.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("animate-pulse rounded-sm bg-charcoal/10", className)} />
  );
}
