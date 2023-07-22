import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicPath = pathname === '/login' || pathname === '/signup'
  const token = request.cookies.get('token') || ''
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup'],
}
