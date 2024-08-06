import { api } from '@lib/api-client'
import type { Role } from '@saas/auth'

type Invite = {
  id: string
  email: string
  role: Role
  createdAt: string
  organization: {
    name: string
  }
  author: {
    id: string
    name: string | null
    avatarUrl: string | null
  } | null
}

type getOrganizationInvitesResponse = {
  invite: Invite
}

type GetInviteProps = {
  inviteId: string
}

export const getInvite = async ({ inviteId }: GetInviteProps) => {
  return await api
    .get(`invites/${inviteId}`)
    .json<getOrganizationInvitesResponse>()
}
