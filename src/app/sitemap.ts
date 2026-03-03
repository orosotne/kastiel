import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rkb.sk';

const paths = [
  '',
  '/pribeh',
  '/svadby',
  '/galeria',
  '/kontakt',
  '/oznamenie',
  '/privacy-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' || path === '/galeria' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}
