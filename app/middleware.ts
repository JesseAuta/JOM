import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const url = req.nextUrl.clone();

  // Allow access to /admin/login always
  if (url.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (url.pathname.startsWith('/admin')) {
    if (!token) {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply to /admin pages only
export const config = {
  matcher: ['/admin/:path*'],
};
