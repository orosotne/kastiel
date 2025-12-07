import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebsiteJsonLd, TouristAttractionJsonLd } from "@/components/seo/JsonLd";

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
  title: {
    default: "Kaštieľ Bošany | In Integrum - Renesančná svadobná lokalita",
    template: "%s | Kaštieľ Bošany",
  },
  description: "Renesančný kaštieľ Bošany z 16. storočia - ideálne miesto pre svadby, firemné akcie a kultúrne podujatia. 17 rokov obnovy, unikátna atmosféra historickej pamiatky na Slovensku.",
  keywords: [
    "kaštieľ Bošany",
    "svadobná lokalita Slovensko",
    "renesančný kaštieľ",
    "svadba v kaštieli",
    "historická pamiatka",
    "In Integrum",
    "firemné akcie kaštieľ",
    "kultúrne podujatia",
    "Topoľčany okolie",
    "svadobný priestor",
    "wedding venue Slovakia",
    "Renaissance castle Slovakia"
  ],
  authors: [{ name: "In Integrum o.z.", url: "https://inintegrum.sk" }],
  creator: "In Integrum o.z.",
  publisher: "In Integrum o.z.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Kaštieľ Bošany | In Integrum - Renesančná svadobná lokalita",
    description: "Renesančný kaštieľ Bošany z 16. storočia - ideálne miesto pre svadby, firemné akcie a kultúrne podujatia. Unikátna atmosféra historickej pamiatky.",
    type: "website",
    locale: "sk_SK",
    alternateLocale: ["en_US", "de_DE"],
    siteName: "Kaštieľ Bošany - In Integrum",
    url: "https://inintegrum.sk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kaštieľ Bošany - Renesančný kaštieľ na Slovensku",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaštieľ Bošany | In Integrum",
    description: "Renesančný kaštieľ z 16. storočia - svadby, akcie, kultúra. Objavte históriu, ktorá sa vracia do života.",
    images: ["/twitter-image.png"],
    creator: "@kastiel_bosany",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://inintegrum.sk",
    languages: {
      "sk": "https://inintegrum.sk/sk",
      "en": "https://inintegrum.sk/en",
      "de": "https://inintegrum.sk/de",
    },
  },
  verification: {
    google: "google-site-verification-code", // Nahradiť skutočným kódom
  },
  category: "travel",
  metadataBase: new URL("https://inintegrum.sk"),
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
    <html lang={locale} className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/* Preconnect pre rýchlejšie načítanie fontov */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload kritických zdrojov pre LCP */}
        <link 
          rel="preload" 
          href="/images/Hero_image.jpeg" 
          as="image" 
          type="image/jpeg"
          fetchPriority="high"
        />
        
        {/* DNS prefetch pre externé zdroje */}
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        
        {/* JSON-LD Schema */}
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        <TouristAttractionJsonLd />
      </head>
      <body className="bg-cream text-charcoal font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}



