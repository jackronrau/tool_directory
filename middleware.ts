import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { fallbackLng, languages } from './app/i18n/settings';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Get preferred language from Accept-Language header
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales = ['en', 'zh'];
  
  try {
    const preferredLocale = matchLocale(languages, locales, fallbackLng);
    return preferredLocale;
  } catch (error) {
    return fallbackLng;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname starts with excluded paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('/images/') ||
    pathname.includes('.') // This will match files like favicon.ico, manifest.json etc.
  ) {
    return NextResponse.next();
  }

  // Check if there's already a valid locale in the pathname
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);

    // For paths without locale
    // if (locale === fallbackLng) {
    //   // If the locale is the default one (en), don't add prefix
    //   return NextResponse.next();
    // }

    // For non-default locales, redirect to the localized path
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};