import { api } from '@lib/api-client'
import type { Role } from '@saas/auth'

type Invite = {
  id: string
  email: string
  role: Role
  createdAt: string
  author: {
    id: string
    name: string | null
    avatarUrl: string | null
  } | null
}

type getOrganizationInvitesResponse = {
  invites: Array<Invite>
}

type GetInvitesProps = {
  organizationSlug: string
}

export const getInvites = async ({ organizationSlug }: GetInvitesProps) => {
  return await api
    .get(`organizations/${organizationSlug}/invites`, {
      next: {
        tags: [`${organizationSlug}-invites`],
      },
    })
    .json<getOrganizationInvitesResponse>()
}
