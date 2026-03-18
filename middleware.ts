import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Dashboard and admin auth is checked client-side via sessionStorage.
  // Middleware cannot read sessionStorage (server-side).
  // Client-side useEffect in each page handles the redirect.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
