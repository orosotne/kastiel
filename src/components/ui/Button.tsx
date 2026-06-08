import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Button — the single source of truth for actions and call-to-action links.
 *
 * Polymorphic: renders a real <button> by default, or a next/link <a> when
 * `href` is provided (so navigation CTAs stay accessible and can prefetch).
 * Authored as a "shared" component (no "use client") so it works in both Server
 * and Client trees — only the consumer's context decides.
 *
 * Replaces the copy-pasted `bg-gold ... hover:bg-gold-dark` / bordered button
 * markup scattered across the gallery, story and contact pages.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-wider " +
  "transition-all duration-300 ease-out select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-60 disabled:pointer-events-none aria-disabled:opacity-60 aria-disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gold text-charcoal hover:bg-gold-dark hover:shadow-lg focus-visible:ring-gold",
  secondary: "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream focus-visible:ring-charcoal",
  ghost: "text-charcoal hover:text-gold focus-visible:ring-gold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-5 text-base",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner, blocks interaction, and sets aria-busy. */
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type AsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    /** When set, renders as a next/link anchor instead of a <button>. */
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const anchorProps = rest as Omit<AsLink, keyof BaseProps>;
    return (
      <Link
        {...anchorProps}
        className={classes}
        aria-busy={isLoading || undefined}
        aria-disabled={isLoading || undefined}
        tabIndex={isLoading ? -1 : anchorProps.tabIndex}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", disabled, ...buttonProps } = rest as Omit<
    AsButton,
    keyof BaseProps
  >;
  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled || isLoading}
      className={classes}
      aria-busy={isLoading || undefined}
    >
      {content}
    </button>
  );
}
