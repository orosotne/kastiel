export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://inintegrum.sk/#organization",
    name: "In Integrum o.z.",
    alternateName: "Kaštieľ Bošany",
    url: "https://inintegrum.sk",
    logo: "https://inintegrum.sk/kastiel-bosany-logo.svg",
    description: "Občianske združenie In Integrum sa venuje obnove a prevádzke renesančného kaštieľa Bošany. Organizujeme svadby, firemné akcie a kultúrne podujatia.",
    foundingDate: "2007",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SNP 113/1",
      addressLocality: "Bošany",
      postalCode: "956 18",
      addressCountry: "SK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+421-907-726-726",
      email: "jmiskeje@gmail.com",
      contactType: "customer service",
      availableLanguage: ["Slovak", "English", "German"],
    },
    sameAs: [
      "https://www.instagram.com/renesancny_kastiel_bosany/",
      "https://www.facebook.com/kastiel.bosany",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": "https://inintegrum.sk/#venue",
    name: "Kaštieľ Bošany",
    description: "Renesančný kaštieľ z 16. storočia - ideálne miesto pre svadby, firemné akcie a kultúrne podujatia. Kapacita do 150 hostí.",
    url: "https://inintegrum.sk",
    telephone: "+421-907-726-726",
    email: "jmiskeje@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SNP 113/1",
      addressLocality: "Bošany",
      addressRegion: "Trenčiansky kraj",
      postalCode: "956 18",
      addressCountry: "SK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.5847",
      longitude: "18.2358",
    },
    image: [
      "https://inintegrum.sk/images/Hero_image.jpeg",
      "https://inintegrum.sk/images/wedding-venue.jpg",
      "https://inintegrum.sk/images/gallery/interior-1.jpeg",
    ],
    priceRange: "€€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wheelchair Accessible", value: false },
    ],
    maximumAttendeeCapacity: 150,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://inintegrum.sk/#website",
    name: "Kaštieľ Bošany - In Integrum",
    url: "https://inintegrum.sk",
    description: "Oficiálna webová stránka renesančného kaštieľa Bošany",
    publisher: {
      "@id": "https://inintegrum.sk/#organization",
    },
    inLanguage: ["sk", "en", "de"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://inintegrum.sk/sk?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function TouristAttractionJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": "https://inintegrum.sk/#attraction",
    name: "Kaštieľ Bošany",
    alternateName: "Bošany Castle",
    description: "Renesančný kaštieľ z 16. storočia s polygonálnymi vežami. Historická pamiatka obnovovaná od roku 2007. Miesto kde spala Mária Terézia.",
    url: "https://inintegrum.sk",
    image: "https://inintegrum.sk/images/Hero_image.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SNP 113/1",
      addressLocality: "Bošany",
      addressRegion: "Trenčiansky kraj",
      postalCode: "956 18",
      addressCountry: "SK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.5847",
      longitude: "18.2358",
    },
    touristType: ["Cultural", "Historical"],
    isAccessibleForFree: false,
    publicAccess: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

