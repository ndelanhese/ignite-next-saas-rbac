'use server'

import { acceptInvite } from '@http/accept-invite'
import { redirect } from 'next/navigation'

export const acceptInviteAction = async (inviteId: string) => {
  await acceptInvite({ inviteId })

  redirect('/')
}
