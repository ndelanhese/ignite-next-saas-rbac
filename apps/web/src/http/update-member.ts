'use server'

import { api } from '@lib/api-client'
import type { Role } from '@saas/auth'

type UpdateMemberProps = {
  organizationSlug: string
  memberId: string
  role: Role
}

export const updateMember = async ({
  organizationSlug,
  memberId,
  role,
}: UpdateMemberProps) => {
  await api.put(`organizations/${organizationSlug}/members/${memberId}`, {
    json: { role },
  })
}
