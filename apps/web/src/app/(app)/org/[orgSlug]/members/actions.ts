'use server'

import { getCurrentOrg } from '@auth/auth'
import { removeMember } from '@http/remove-member'
import { updateMember } from '@http/update-member'
import type { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

export const removeMemberAction = async (memberId: string) => {
  const currentOrg = getCurrentOrg()

  await removeMember({ memberId, organizationSlug: currentOrg! })

  revalidateTag(`${currentOrg}-members`)
}

export const updateMemberAction = async (memberId: string, role: Role) => {
  const currentOrg = getCurrentOrg()

  await updateMember({ memberId, organizationSlug: currentOrg!, role })

  revalidateTag(`${currentOrg}-members`)
}
