import Script from "next/script";
import { getLocale } from "next-intl/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkb.sk";

const faqByLocale: Record<string, Array<{ question: string; answer: string }>> = {
  sk: [
    {
      question: "Kde sa nachádza Renesančný kaštieľ Bošany?",
      answer:
        "Kaštieľ sa nachádza na adrese SNP 113/1, 956 18 Bošany, Slovensko.",
    },
    {
      question: "Aké služby ponúka kaštieľ?",
      answer:
        "Ponúkame svadby, konferencie, galériu a kultúrne podujatia. V parku nájdete alpaky, jazierko s koi kaprami a vínnu pivnicu.",
    },
    {
      question: "Ako vás môžem kontaktovať?",
      answer:
        "Môžete nás kontaktovať telefonicky na +421 907 726 726 alebo e-mailom na jmiskeje@gmail.com.",
    },
    {
      question: "Aké sú otváracie hodiny?",
      answer:
        "Otváracie hodiny sú Po - Ne: 9:00 - 18:00, alebo podľa predchádzajúcej dohody.",
    },
  ],
  en: [
    {
      question: "Where is the Renaissance Castle Bošany located?",
      answer:
        "The castle is located at SNP 113/1, 956 18 Bošany, Slovakia.",
    },
    {
      question: "What services does the castle offer?",
      answer:
        "We offer weddings, conferences, gallery and cultural events. In the park you will find alpacas, a pond with koi carp and a wine cellar.",
    },
    {
      question: "How can I contact you?",
      answer:
        "You can contact us by phone at +421 907 726 726 or by email at jmiskeje@gmail.com.",
    },
    {
      question: "What are the opening hours?",
      answer:
        "Opening hours are Mon - Sun: 9:00 AM - 6:00 PM, or by prior arrangement.",
    },
  ],
  de: [
    {
      question: "Wo befindet sich das Renaissanceschloss Bošany?",
      answer:
        "Das Schloss befindet sich in der SNP 113/1, 956 18 Bošany, Slowakei.",
    },
    {
      question: "Welche Dienstleistungen bietet das Schloss an?",
      answer:
        "Wir bieten Hochzeiten, Konferenzen, Galerie und kulturelle Veranstaltungen an. Im Park finden Sie Alpakas, einen Teich mit Koi-Karpfen und einen Weinkeller.",
    },
    {
      question: "Wie kann ich Sie kontaktieren?",
      answer:
        "Sie können uns telefonisch unter +421 907 726 726 oder per E-Mail an jmiskeje@gmail.com erreichen.",
    },
    {
      question: "Was sind die Öffnungszeiten?",
      answer:
        "Öffnungszeiten sind Mo - So: 9:00 - 18:00 Uhr oder nach Vereinbarung.",
    },
  ],
};

const breadcrumbHomeLabel: Record<string, string> = {
  sk: "Domov",
  en: "Home",
  de: "Startseite",
};

export default async function StructuredData() {
  const locale = (await getLocale()) || "sk";

  const landmark = {
    "@context": "https://schema.org",
    "@type": ["LandmarksOrHistoricalBuildings", "LocalBusiness"],
    name: "Kaštieľ Bošany",
    alternateName: "Renesančný kaštieľ Bošany",
    description:
      "Renesančný kaštieľ Bošany - miesto kde sa história vracia do života. Svadby, konferencie, galéria a kultúrne podujatia.",
    url: siteUrl,
    telephone: "+421907726726",
    email: "jmiskeje@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SNP 113/1",
      addressLocality: "Bošany",
      addressRegion: "Trenčiansky kraj",
      postalCode: "956 18",
      addressCountry: "SK",
    },
    areaServed: [
      { "@type": "City", name: "Bošany" },
      { "@type": "City", name: "Partizánske" },
      { "@type": "City", name: "Topoľčany" },
      { "@type": "City", name: "Prievidza" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Služby kaštieľa",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Svadby" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Konferencie" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Galéria" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Kultúrne podujatia" },
        },
      ],
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.5819",
      longitude: "18.2461",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    image: [
      `${siteUrl}/images/story-hero.webp`,
      `${siteUrl}/images/castle-after.webp`,
    ],
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbHomeLabel[locale] || "Domov",
        item: `${siteUrl}/${locale}`,
      },
    ],
  };

  const faqItems = faqByLocale[locale] || faqByLocale.sk;
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const schemaArray = [landmark, breadcrumbList, faqPage];

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArray) }}
    />
  );
}
