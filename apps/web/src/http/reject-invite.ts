import { api } from '@lib/api-client'

type RejectInviteRequest = {
  inviteId: string
}

export const rejectInvite = async ({
  inviteId,
}: RejectInviteRequest): Promise<void> => {
  await api.post(`invites/${inviteId}/reject`)
}
