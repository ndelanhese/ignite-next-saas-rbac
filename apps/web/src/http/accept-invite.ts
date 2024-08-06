import { api } from '@lib/api-client'

type AcceptInviteRequest = {
  inviteId: string
}

export const acceptInvite = async ({
  inviteId,
}: AcceptInviteRequest): Promise<void> => {
  await api.post(`invites/${inviteId}/accept`)
}
