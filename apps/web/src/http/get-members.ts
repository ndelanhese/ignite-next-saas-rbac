import { api } from '@lib/api-client'
import type { Role } from '@saas/auth'

type Member = {
  id: string
  name: string | null
  avatarUrl: string | null
  email: string
  userId: string
  role: Role
}

type getMembersResponse = {
  members: Array<Member>
}

type GetMembersProps = {
  organizationSlug: string
}

export const getMembers = async ({ organizationSlug }: GetMembersProps) => {
  return await api
    .get(`organizations/${organizationSlug}/members`, {
      next: {
        tags: [`${organizationSlug}-members`],
      },
    })
    .json<getMembersResponse>()
}
