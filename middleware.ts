import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Dashboard auth is checked client-side via sessionStorage.
  // Middleware cannot read sessionStorage (server-side).
  // Just ensure /dashboard is accessible — client handles redirect.
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
