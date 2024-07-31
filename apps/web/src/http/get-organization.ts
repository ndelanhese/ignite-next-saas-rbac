import { api } from '@lib/api-client'

type getOrganizationResponse = {
  organization: {
    id: string
    name: string
    slug: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

type GetOrganizationProps = {
  organizationSlug: string
}

export const getOrganization = async ({
  organizationSlug,
}: GetOrganizationProps) => {
  return await api
    .get(`organizations/${organizationSlug}`)
    .json<getOrganizationResponse>()
}
