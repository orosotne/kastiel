import { MetadataRoute } from 'next';

const BASE_URL = 'https://inintegrum.sk';
const locales = ['sk', 'en', 'de'];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/pribeh', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/svadby', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/galeria', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/kontakt', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            sk: `${BASE_URL}/sk${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
            de: `${BASE_URL}/de${page.path}`,
          },
        },
      });
    });
  });

  // Add root URL that redirects to default locale
  sitemapEntries.unshift({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  return sitemapEntries;
}

