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

const RESTORATION_BASE = '/images/phoenix/restoration';

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
    `${RESTORATION_BASE}/14. april 2014 - 3.webp`,
    `${RESTORATION_BASE}/15.Maj - 2016.webp`,
    `${RESTORATION_BASE}/15. maj - 2016 (2).webp`,
    `${RESTORATION_BASE}/IMG_0048.webp`,
    `${RESTORATION_BASE}/IMG_0049.webp`,
    `${RESTORATION_BASE}/IMG_0052.webp`,
    `${RESTORATION_BASE}/IMG_0057.webp`,
    `${RESTORATION_BASE}/IMG_0058.webp`,
    `${RESTORATION_BASE}/IMG_0059.webp`,
    `${RESTORATION_BASE}/IMG_0064.webp`,
    `${RESTORATION_BASE}/IMG_0065.webp`,
    `${RESTORATION_BASE}/IMG_0192.webp`,
    `${RESTORATION_BASE}/IMG_0194.webp`,
    `${RESTORATION_BASE}/IMG_0436.webp`,
    `${RESTORATION_BASE}/IMG_0438.webp`,
    `${RESTORATION_BASE}/IMG_0439.webp`,
    `${RESTORATION_BASE}/IMG_0440.webp`,
    `${RESTORATION_BASE}/IMG_0466.webp`,
    `${RESTORATION_BASE}/IMG_0469.webp`,
    `${RESTORATION_BASE}/IMG_0501.webp`,
    `${RESTORATION_BASE}/IMG_0911.webp`,
    `${RESTORATION_BASE}/IMG_0996.webp`,
    `${RESTORATION_BASE}/IMG_1029.webp`,
    `${RESTORATION_BASE}/IMG_1252.webp`,
    `${RESTORATION_BASE}/IMG_1256.webp`,
    `${RESTORATION_BASE}/IMG_1257.webp`,
    `${RESTORATION_BASE}/IMG_1343.webp`,
    `${RESTORATION_BASE}/IMG_2781.webp`,
    `${RESTORATION_BASE}/IMG_2782.webp`,
    `${RESTORATION_BASE}/IMG_2783.webp`,
    `${RESTORATION_BASE}/IMG_2784.webp`,
    `${RESTORATION_BASE}/IMG_2786.webp`,
    `${RESTORATION_BASE}/IMG_2787.webp`,
    `${RESTORATION_BASE}/IMG_2788.webp`,
    `${RESTORATION_BASE}/IMG_2791.webp`,
    `${RESTORATION_BASE}/IMG_2792.webp`,
    `${RESTORATION_BASE}/077F2ADC-BBF6-47D8-A562-B9CB0F66EA92.webp`,
    `${RESTORATION_BASE}/4B60797C-4129-4045-9CAE-B190C9E60DFE.webp`,
    `${RESTORATION_BASE}/81386ABD-7EE6-40ED-A05C-AE05FEAA982D.webp`,
    `${RESTORATION_BASE}/B1DE9CC4-13B0-46E2-B553-02564F2A6B7D.webp`,
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
        (entry as MetadataRoute.Sitemap[number] & { images?: { url: string }[] }).images = images.map((src) => ({ url: `${siteUrl}${src}` }));
      }
      entries.push(entry);
    }
  }

  return entries;
}
