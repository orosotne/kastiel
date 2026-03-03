import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import { debugLog } from '@/lib/debug';
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import CookieConsent from "@/components/layout/CookieConsent";
import ScrollToTop from "@/components/ui/ScrollToTop";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

const localeToOg: Record<string, string> = {
  sk: "sk_SK",
  en: "en_US",
  de: "de_DE",
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  // #region agent log
  debugLog({ location: 'layout.tsx:generateMetadata', message: 'generateMetadata called', data: { locale }, hypothesisId: 'H1' });
  // #endregion
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  // #region agent log
  debugLog({ location: 'layout.tsx:generateMetadata', message: 'translations loaded', data: { locale, title, descriptionLength: description?.length }, hypothesisId: 'H2' });
  // #endregion

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rkb.sk';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: ["kaštieľ", "Bošany", "castle", "weddings", "conferences", "gallery", "renaissance", "history"],
    authors: [{ name: "Renesančný kaštieľ Bošany" }],
    icons: {
      icon: [
        { url: "/favicon-castle.svg", type: "image/svg+xml" },
      ],
      apple: "/icon-192.png",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: localeToOg[locale] || "sk_SK",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force dynamic rendering for all pages (required by next-intl)
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // #region agent log
  debugLog({ location: 'layout.tsx:RootLayout', message: 'RootLayout render start', data: { locale, localesValid: locales.includes(locale as any) }, hypothesisId: 'H1' });
  // #endregion
  if (!locales.includes(locale as any)) {
    debugLog({ location: 'layout.tsx:RootLayout', message: 'locale not found, calling notFound', data: { locale }, hypothesisId: 'H1' });
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const msgKeys = typeof messages === 'object' ? Object.keys(messages).length : 0;
  // #region agent log
  debugLog({ location: 'layout.tsx:RootLayout', message: 'messages loaded', data: { locale, messageNamespaceCount: msgKeys }, hypothesisId: 'H2' });
  // #endregion

  return (
    <html lang={locale} className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="bg-cream text-charcoal font-sans antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-gold focus:text-charcoal focus:px-6 focus:py-3 focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <AnnouncementBanner />
          <Header />
          <main id="main-content" className="overflow-x-hidden">{children}</main>
          <Footer />
          <CookieConsent />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}



