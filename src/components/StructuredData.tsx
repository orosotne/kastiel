import Script from "next/script";
import { getLocale } from "next-intl/server";
import { SITE_URL, CONTACT } from "@/lib/site-config";

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
    {
      question: "Organizujete svadby v kaštieli Bošany?",
      answer:
        "Áno, Renesančný kaštieľ Bošany ponúka svadobný priestor pre do 150 hostí. Ideálne pre svadby z Partizánskeho, Topoľčian a okolia.",
    },
    {
      question: "Ako ďaleko je kaštieľ od Partizánskeho?",
      answer:
        "Kaštieľ Bošany je vzdialený približne 15 minút autom od Partizánskeho. Bošany ležia v okrese Partizánske, Trenčiansky kraj.",
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
    {
      question: "Do you organize weddings at Bošany Castle?",
      answer:
        "Yes, Renaissance Castle Bošany offers a wedding venue for up to 150 guests. Ideal for weddings from Partizánske, Topoľčany and the surrounding area.",
    },
    {
      question: "How far is the castle from Partizánske?",
      answer:
        "Castle Bošany is approximately 15 minutes by car from Partizánske. Bošany is located in the Partizánske district, Trenčín Region.",
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
    {
      question: "Veranstalten Sie Hochzeiten im Schloss Bošany?",
      answer:
        "Ja, das Renaissanceschloss Bošany bietet einen Hochzeitsort für bis zu 150 Gäste. Ideal für Hochzeiten aus Partizánske, Topoľčany und der Umgebung.",
    },
    {
      question: "Wie weit ist das Schloss von Partizánske entfernt?",
      answer:
        "Das Schloss Bošany ist etwa 15 Autominuten von Partizánske entfernt. Bošany liegt im Bezirk Partizánske, Region Trenčín.",
    },
  ],
};

const breadcrumbHomeLabel: Record<string, string> = {
  sk: "Domov",
  en: "Home",
  de: "Startseite",
};

/**
 * Podujatia – pridajte sem keď máte dátumy. Event schema sa automaticky pridá do JSON-LD.
 * Formát startDate/endDate: ISO 8601 (napr. "2025-06-15T18:00:00" alebo "2025-06-15").
 */
const upcomingEvents: Array<{
  name: string;
  nameEn?: string;
  nameDe?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}> = [
  // Príklad: { name: "Vernisáž výstavy", nameEn: "Exhibition opening", startDate: "2025-06-15T18:00:00" },
];

export default async function StructuredData() {
  const locale = (await getLocale()) || "sk";

  const landmark = {
    "@context": "https://schema.org",
    "@type": ["LandmarksOrHistoricalBuildings", "LocalBusiness"],
    name: "Kaštieľ Bošany",
    alternateName: "Renesančný kaštieľ Bošany",
    description:
      "Renesančný kaštieľ Bošany - miesto kde sa história vracia do života. Svadby, konferencie, galéria a kultúrne podujatia.",
    url: SITE_URL,
    telephone: CONTACT.phoneHref,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
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
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
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
      `${SITE_URL}/images/story-hero.webp`,
      `${SITE_URL}/images/castle-after.webp`,
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
        item: `${SITE_URL}/${locale}`,
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

  const eventSchemas = upcomingEvents.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: locale === "en" ? e.nameEn ?? e.name : locale === "de" ? e.nameDe ?? e.name : e.name,
    startDate: e.startDate,
    ...(e.endDate && { endDate: e.endDate }),
    ...(e.description && { description: e.description }),
    location: {
      "@type": "Place",
      name: "Kaštieľ Bošany",
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.city,
        postalCode: CONTACT.address.postalCode,
        addressCountry: CONTACT.address.country,
      },
    },
  }));

  const schemaArray = [landmark, breadcrumbList, faqPage, ...eventSchemas];

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArray) }}
    />
  );
}
