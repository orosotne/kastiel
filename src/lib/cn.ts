export type ClassValue = string | number | false | null | undefined;

/**
 * Tiny classname combiner — filters falsy values and joins with spaces.
 * Keeps conditional class composition readable without adding a dependency.
 *
 *   cn("px-4", isActive && "bg-gold", className)
 *
 * Note: this does NOT de-duplicate conflicting Tailwind utilities the way
 * `tailwind-merge` would. Components below are authored so the caller's
 * `className` comes last and wins for simple overrides; reach for
 * `tailwind-merge` only if you start fighting specificity.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
