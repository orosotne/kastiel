import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['sk', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ locale }) => {
  if (!isLocale(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});



