import { api } from '@lib/api-client'
import type { Role } from '@saas/auth'

type Invite = {
  id: string
  email: string
  role: Role
  createdAt: Date
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
  invites: Array<Invite>
}

export const getPendingInvites = async () => {
  return await api.get('pending-invites').json<getOrganizationInvitesResponse>()
}
