import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('mavura_admin_session')?.value;
    
    // Verify session - in production this would be more robust
    // but for our requirements, a secret shared between env and cookie is reliable.
    const expectedSecret = process.env.ADMIN_SESSION_SECRET || 'mavura_leadership_portal_2024_secure_token';
    if (!session || session !== expectedSecret) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
