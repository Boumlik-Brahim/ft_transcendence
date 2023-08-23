import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default function middleware(req: NextRequest, res: NextResponse) {
    const path = req.nextUrl.pathname;
    const isPublicPath = path === '/login';
    const hasToken = req.cookies.has("accessToken");
    const userId = req.cookies.get("id")?.value || "";

    if (isPublicPath && hasToken){
        return NextResponse.redirect(new URL(`/profile/${userId}`, req.nextUrl));
    }
    if (!hasToken && !isPublicPath){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
}
 
export const config = {
  matcher: [
    '/leaderboard',
    '/setting',
    '/twofa',
    '/login',
    '/channels/:path*',
    '/achievements',
    '/chat/:path*',
    '/game/:path*',
    '/play',
    '/profile/:path*',
  ],
}