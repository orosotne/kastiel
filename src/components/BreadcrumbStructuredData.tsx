import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkb.sk";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbStructuredDataProps {
  locale: string;
  items: BreadcrumbItem[];
}

export default function BreadcrumbStructuredData({ locale, items }: BreadcrumbStructuredDataProps) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
