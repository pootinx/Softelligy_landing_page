import { NextResponse } from 'next/server';

// Routes protégées (admin uniquement)
const protectedRoutes = ['/admin/dashboard', '/admin/residences', '/admin/locataires', '/admin/paiements', '/admin/maintenances'];
const authRoutes = ['/admin/login'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si l'utilisateur est connecté (via le token dans les cookies)
  const token = request.cookies.get('firebase-auth-token')?.value;
  const isAuthenticated = !!token;
  
  // Si la route est protégée et non connecté → rediriger vers login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Si déjà connecté et sur la page login → rediriger vers dashboard
  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};