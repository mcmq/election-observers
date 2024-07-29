import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const supabase = createClient()

  if (pathname.startsWith('/admin')) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user)
      return NextResponse.rewrite(new URL(`/login?redirect=${pathname}`, request.nextUrl))
    if (user?.user_metadata.role !== 'admin')
      return NextResponse.rewrite(new URL('/admin/only-admin', request.nextUrl))
    if (pathname.startsWith('/login'))
      return NextResponse.redirect(new URL('/admin', request.nextUrl))
    return NextResponse.next()
  }

  if (pathname.startsWith('/user')) {
    const { data } = await supabase.auth.getUser()
    if (!data.user)
      return NextResponse.rewrite(new URL(`/login?redirect=${pathname}`, request.nextUrl))
    if (pathname.startsWith('/login'))
      return NextResponse.redirect(new URL('/user', request.nextUrl))
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}