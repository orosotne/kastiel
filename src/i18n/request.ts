import { getRequestConfig } from 'next-intl/server';

export const locales = ['sk', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` replaces the deprecated `locale` param (next-intl 3.22+).
  // Fall back to the default locale; invalid [locale] segments are still 404'd
  // by the locale layout's isLocale() guard.
  const requested = await requestLocale;
  const locale: Locale = isLocale(requested) ? requested : 'sk';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});



