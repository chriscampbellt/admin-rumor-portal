import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/admin/auth/sign-in',
  '/admin/auth/verify-account',
  '/admin/auth/reset-password',
  '/admin/auth/new-password',
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (
    !token &&
    !publicRoutes.includes(pathname) &&
    pathname.startsWith('/admin')
  ) {
    const loginUrl = new URL('/admin/auth/sign-in', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && publicRoutes.includes(pathname)) {
    const dashboardUrl = new URL('/admin/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)',
  ],
};
