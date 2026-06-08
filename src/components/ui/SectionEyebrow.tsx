import { cn } from "@/lib/cn";

/**
 * SectionEyebrow — the gold hairline + uppercase label motif used above almost
 * every section heading. Replaces ~12 hand-rolled copies that had drifted
 * (gap-3/4, w-12/16, tracking-[0.2em]/[0.3em]) into one consistent primitive.
 *
 * Decorative lines are aria-hidden; only the label is exposed to assistive tech.
 * Server-Component friendly (no hooks / interactivity).
 */
export type SectionEyebrowProps = {
  label: string;
  /** Centered (line–label–line) or left-aligned (label–line). Default: center. */
  align?: "center" | "left";
  /** Use on dark backgrounds — keeps gold accents but lightens nothing else. */
  tone?: "gold" | "muted";
  className?: string;
};

export function SectionEyebrow({
  label,
  align = "center",
  tone = "gold",
  className,
}: SectionEyebrowProps) {
  const line = <span aria-hidden className="h-px w-12 bg-gold" />;
  const labelEl = (
    <span
      className={cn(
        "text-sm uppercase tracking-[0.2em]",
        tone === "gold" ? "text-gold" : "text-white/70"
      )}
    >
      {label}
    </span>
  );

  // Centered eyebrows are line–label–line; left-aligned are line–label.
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" ? "justify-center" : "justify-start",
        className
      )}
    >
      {line}
      {labelEl}
      {align === "center" && line}
    </div>
  );
}
