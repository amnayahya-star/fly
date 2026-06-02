import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

const locales = ['en', 'ar', 'fa'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  // Check if there is any supported locale in the Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale;
      }
    }
  }
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files, API routes, Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Redirect to the same path but with locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }

  // Route protection for Admin pages
  if (pathname.includes('/admin')) {
    const sessionCookie = request.cookies.get('session')?.value;
    
    // Extract locale from the matched path
    const pathLocale = pathname.split('/')[1] || defaultLocale;
    const loginUrl = new URL(`/${pathLocale}/login`, request.url);

    if (!sessionCookie) {
      return NextResponse.redirect(loginUrl);
    }

    try {
      const parsed = await decrypt(sessionCookie);
      
      if (parsed.user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL(`/${pathLocale}`, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
