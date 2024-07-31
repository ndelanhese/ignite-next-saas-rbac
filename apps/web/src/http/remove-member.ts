'use server'

import { api } from '@lib/api-client'

type RemoveMemberProps = {
  organizationSlug: string
  memberId: string
}

export const removeMember = async ({
  organizationSlug,
  memberId,
}: RemoveMemberProps) => {
  await api.delete(`organizations/${organizationSlug}/members/${memberId}`)
}
