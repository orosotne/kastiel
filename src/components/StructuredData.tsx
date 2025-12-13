import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LandmarksOrHistoricalBuildings",
    "name": "Kaštieľ Bošany",
    "alternateName": "In Integrum – Kaštieľ Bošany",
    "description": "Renesančný kaštieľ Bošany - miesto kde sa história vracia do života.",
    "url": "https://kastielbosany.sk", // Assuming this is the domain, update if known
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bošany",
      "addressCountry": "SK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.5833", // Approximate coordinates for Bošany
      "longitude": "18.2500"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    },
    "image": [
       "https://kastielbosany.sk/images/hero-poster.jpg",
       "https://kastielbosany.sk/images/castle-after.jpg"
    ]
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
