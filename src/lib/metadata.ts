import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n/request";
import { SITE_URL } from "@/lib/site-config";

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
    canonical: `${SITE_URL}/${locale}${basePath}`,
    languages: Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}/${l}${basePath}`])
    ) as Record<string, string>,
  };
}

/**
 * Builds full page Metadata (title/description/keywords/OpenGraph/alternates)
 * from a translation namespace that exposes `metadata.title` and
 * `metadata.description`. Collapses the per-page layout boilerplate to one call.
 */
export async function buildPageMetadata({
  locale,
  namespace,
  path,
  keywords = [],
}: {
  locale: string;
  namespace: string;
  path: string;
  keywords?: string[];
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const title = t("metadata.title");
  const description = t("metadata.description");
  return {
    title,
    description,
    keywords,
    openGraph: { title, description },
    alternates: buildAlternates(locale, path),
  };
}
