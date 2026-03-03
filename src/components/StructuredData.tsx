import Script from "next/script";

export default function StructuredData() {
  const siteUrl = "https://kastiel-martin-miskejes-projects.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LandmarksOrHistoricalBuildings",
    "name": "Kaštieľ Bošany",
    "alternateName": "Renesančný kaštieľ Bošany",
    "description": "Renesančný kaštieľ Bošany - miesto kde sa história vracia do života. Svadby, konferencie, galéria a kultúrne podujatia.",
    "url": siteUrl,
    "telephone": "+421907726726",
    "email": "jmiskeje@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SNP 113/1",
      "addressLocality": "Bošany",
      "postalCode": "956 18",
      "addressCountry": "SK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.5819",
      "longitude": "18.2461"
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
      "opens": "09:00",
      "closes": "18:00"
    },
    "image": [
      `${siteUrl}/images/story-hero.webp`,
      `${siteUrl}/images/castle-after.webp`
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
