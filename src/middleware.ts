import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'sk',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(sk|en|de)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

