import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Check if we are trying to access an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('session')?.value;
    
    // If no session, redirect to login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Decode and verify the JWT token
      const parsed = await decrypt(sessionCookie);
      
      // If role is not ADMIN, redirect to home page or unauthorized page
      if (parsed.user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // User is Admin, allow request
      return NextResponse.next();
      
    } catch (error) {
      // Token invalid or expired
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
