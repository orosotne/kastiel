import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from './i18n/request';

// #region agent log
async function logRequest(request: NextRequest) {
  try {
    await fetch('http://127.0.0.1:7420/ingest/e7b8ea9e-2b53-44dd-b0ba-855cfff29495', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: 'middleware.ts', message: 'middleware ran', data: { pathname: request.nextUrl.pathname }, hypothesisId: 'H5', timestamp: Date.now() }),
    });
  } catch { /* ignore */ }
}
// #endregion

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'sk',
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  await logRequest(request);
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(sk|en|de)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

