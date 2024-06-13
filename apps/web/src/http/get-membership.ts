import { api } from '@lib/api-client'
import type { Role } from '@saas/auth'

type Membership = {
  id: string
  role: Role
  userId: string
  organizationId: string
}

type getMembershipsResponse = {
  membership: Membership
}

type getMembershipProps = {
  organizationSlug: string
}

export const getMembership = async ({
  organizationSlug,
}: getMembershipProps) => {
  return await api
    .get(`organizations/${organizationSlug}/membership`)
    .json<getMembershipsResponse>()
}
