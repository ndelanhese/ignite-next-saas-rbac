import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const response = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const [, , slug] = pathname.split('/')

    response.cookies.set('org', slug)
    return response
  }

  response.cookies.delete('org')
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
