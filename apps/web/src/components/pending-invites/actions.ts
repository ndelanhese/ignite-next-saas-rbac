'use server'

import { acceptInvite } from '@http/accept-invite'
import { revalidateTag } from 'next/cache'

export const acceptInviteAction = async (inviteId: string) => {
  await acceptInvite({ inviteId })

  revalidateTag('organizations')
}

export const rejectInviteAction = async (inviteId: string) => {
  await acceptInvite({ inviteId })
}
