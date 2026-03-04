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

// Hlavné obrázky na stránkach pre Image Sitemap (Google Images)
const imagesByPath: Record<string, string[]> = {
  '': [
    '/images/Hero_image.webp',
    '/images/story-hero.webp',
    '/images/castle-after.webp',
    '/images/phoenix/before-1.webp',
    '/images/phoenix/after-1.webp',
    '/images/park-alpacas.webp',
    '/images/chronicle-detail.webp',
  ],
  '/galeria': [
    '/images/gallery-hero.webp',
    ...Array.from({ length: 19 }, (_, i) => `/images/gallery/interior/interior-${i + 1}.webp`),
    ...['21', '22', '23', '24', '25'].map((n) => `/images/gallery/interior/interior-${n}.webp`),
    ...Array.from({ length: 9 }, (_, i) => `/images/gallery/exterior/exterior-${i + 1}.webp`),
    ...Array.from({ length: 7 }, (_, i) => `/images/gallery/exterior/exterior-${13 + i}.webp`),
    ...['21', '22', '23'].map((n) => `/images/gallery/exterior/exterior-${n}.webp`),
    ...Array.from({ length: 6 }, (_, i) => `/images/gallery/exterior/exterior-${25 + i}.webp`),
    ...Array.from({ length: 9 }, (_, i) => `/images/gallery/exterior/exterior-${32 + i}.webp`),
  ],
  '/svadby': [
    '/images/wedding-hero.webp',
    '/images/wedding-venue.webp',
    '/images/alpaca-boska.webp',
    '/images/alpaca-riso.webp',
    ...Array.from({ length: 8 }, (_, i) => `/images/weddings/wedding-${i + 1}.webp`),
  ],
  '/pribeh': [
    '/images/story-hero.webp',
    '/images/bosaniovci.webp',
    '/images/schmitt.webp',
    '/images/chronicle-detail.webp',
    ...Array.from({ length: 10 }, (_, i) => `/images/history/history-${i + 1}.webp`),
    ...Array.from({ length: 62 }, (_, i) => `/images/gallery/analysis-${i + 1}.webp`),
  ],
  '/kontakt': ['/images/contact-hero.webp'],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      const images = imagesByPath[path];
      const entry: MetadataRoute.Sitemap[number] = {
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' || path === '/galeria' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      };
      if (images && images.length > 0) {
        entry.images = images.map((src) => ({ url: `${siteUrl}${src}` }));
      }
      entries.push(entry);
    }
  }

  return entries;
}
