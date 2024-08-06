import { acceptInvite } from '@http/accept-invite'
import { signInWithGithub } from '@http/sign-in-with-github'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      {
        message: 'Github OAuth code was not found.',
      },
      { status: 401 },
    )
  }

  const { token } = await signInWithGithub({ code })

  const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7
  cookies().set('token', token, {
    path: '/',
    maxAge: SEVEN_DAYS_IN_SECONDS,
  })

  const inviteId = cookies().get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInvite({ inviteId })
      cookies().delete('inviteId')
    } catch (error) {
      console.error(error)
    }
  }

  const redirectURL = request.nextUrl.clone()

  redirectURL.pathname = '/'
  redirectURL.search = ''

  return NextResponse.redirect(redirectURL)
}
