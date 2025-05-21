import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const jwtToken = request.cookies.get('jwt_token')?.value;

  const isAuthenticated = accessToken && refreshToken && jwtToken;
  const isAuthPage = request.nextUrl.pathname === '/login' || 
                    request.nextUrl.pathname === '/forgot-password' ||
                    request.nextUrl.pathname === '/reset-password';

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/staff', request.url));
  }

  // If user is not authenticated and tries to access protected pages, redirect to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/staff/:path*',
    '/institution/:path*',
    '/donnees/:path*',
    '/donors/:path*',
    '/donations/:path*',
    '/subscriptions/:path*',
    '/payments/:path*',
    '/settings/:path*',
    '/login',
    '/forgot-password',
    '/reset-password',
  ],
}; 