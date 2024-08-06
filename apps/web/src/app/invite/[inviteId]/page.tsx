import { auth, isAuthenticated } from '@auth/auth'
import { AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { getInvite } from '@http/get-invite'
import { Avatar } from '@radix-ui/react-avatar'
import { getNameInitials } from '@utils/get-name-initials'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { acceptInviteAction } from './actions'

dayjs.extend(relativeTime)

type InvitePageParams = {
  params: {
    inviteId: string
  }
}

export const metadata: Metadata = {
  title: 'Accept invitation',
}

const InvitePage = async ({ params }: InvitePageParams) => {
  const { inviteId } = params

  const { invite } = await getInvite({ inviteId })
  const isUserAuthenticated = await isAuthenticated()

  let currentUserEmail = null

  if (isUserAuthenticated) {
    const { user } = await auth()
    currentUserEmail = user.email
  }

  const userIsAuthenticatedWithSameEmailFromInvite =
    currentUserEmail === invite.email

  const signInFromInvite = async () => {
    'use server'

    cookies().set('inviteId', inviteId)

    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite?.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback>
              {getNameInitials(invite?.author?.name)}
            </AvatarFallback>
          </Avatar>

          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>
            .{' '}
            <span className="text-xs">{dayjs(invite.createdAt).fromNow()}</span>
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite}>
            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              icon={<LogIn className="mr-2 size-4" />}
            >
              Sign in to accept the invite
            </Button>
          </form>
        )}

        {userIsAuthenticatedWithSameEmailFromInvite && (
          <form action={acceptInviteAction.bind(null, inviteId)}>
            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              icon={<CheckCircle className="mr-2 size-4" />}
            >
              Join {invite.organization.name}
            </Button>
          </form>
        )}

        {isUserAuthenticated && !userIsAuthenticatedWithSameEmailFromInvite && (
          <div className="space-y-4">
            <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
              This invite was sent to{' '}
              <span className="font-medium text-foreground">
                {invite.email}
              </span>{' '}
              but you are currently authenticated as{' '}
              <span className="font-medium text-foreground">
                {currentUserEmail}
              </span>
              .
            </p>

            <div className="space-y-2">
              <Button className="w-full" variant="secondary" asChild>
                <Link href="/api/auth/sign-out" prefetch={false}>
                  <LogOut className="mr-2 size-4" />
                  Sign out from {currentUserEmail}
                </Link>
              </Button>

              <Button className="w-full" variant="outline" asChild>
                <Link href="/">Back to dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvitePage
