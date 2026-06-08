import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'sk',
  localePrefix: 'always'
});

export default intlMiddleware;

export const config = {
  matcher: ['/', '/(sk|en|de)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
