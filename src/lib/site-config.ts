/**
 * Single source of truth for site-wide configuration: canonical URL, brand name,
 * and business contact / NAP data. Import these instead of re-declaring literals
 * so the displayed site, mailto/tel links and JSON-LD structured data never drift.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rkb.sk";

export const BRAND = "Renesančný kaštieľ Bošany";

export const CONTACT = {
  email: "jmiskeje@gmail.com",
  /** Human-readable, spaced — for display */
  phone: "+421 907 726 726",
  /** Compact, for tel:/mailto hrefs and schema.org telephone */
  phoneHref: "+421907726726",
  ico: "42024757",
  dic: "2022449737",
  address: {
    street: "SNP 113/1",
    city: "Bošany",
    postalCode: "956 18",
    region: "Trenčiansky kraj",
    country: "SK",
  },
  geo: { lat: "48.5819", lng: "18.2461" },
} as const;
