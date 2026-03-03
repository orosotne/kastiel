import type { Metadata } from "next";
import { locales } from "@/i18n/request";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkb.sk";

/**
 * Generates alternates (canonical + hreflang) for multi-language SEO.
 * Use in generateMetadata for each page.
 */
export function buildAlternates(
  locale: string,
  path: string = ""
): Metadata["alternates"] {
  const basePath = path ? `/${path}` : "";
  return {
    canonical: `${siteUrl}/${locale}${basePath}`,
    languages: Object.fromEntries(
      locales.map((l) => [l, `${siteUrl}/${l}${basePath}`])
    ) as Record<string, string>,
  };
}
