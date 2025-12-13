import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
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

export const metadata: Metadata = {
  title: "In Integrum – Kaštieľ Bošany",
  description: "Renesančný kaštieľ Bošany - miesto kde sa história vracia do života. Svadby, konferencie, galéria a kultúrne podujatia.",
  keywords: ["kaštieľ", "Bošany", "svadby", "konferencie", "galéria", "renesancia", "história"],
  authors: [{ name: "In Integrum" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "In Integrum – Kaštieľ Bošany",
    description: "Renesančný kaštieľ Bošany - miesto kde sa história vracia do života.",
    type: "website",
    locale: "sk_SK",
  },
};

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
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="bg-cream text-charcoal font-sans antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <AnnouncementBanner />
          <Header />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
          <CookieConsent />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}



