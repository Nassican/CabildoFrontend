export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Add your custom middleware here
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


  //console.log("Session", session);
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();

    url.pathname = '/login';
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/roles/:path*', '/users/:path*', '/'],
};

// A better middleware for NextAuth.js
