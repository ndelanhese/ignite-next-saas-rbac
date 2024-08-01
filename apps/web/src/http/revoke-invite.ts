'use server'

import { api } from '@lib/api-client'

type RevokeInviteProps = {
  organizationSlug: string
  inviteId: string
}

export const revokeInvite = async ({
  organizationSlug,
  inviteId,
}: RevokeInviteProps) => {
  await api.delete(`organizations/${organizationSlug}/invites/${inviteId}`)
}
