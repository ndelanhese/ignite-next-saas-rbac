import { api } from '@lib/api-client'

type UpdateOrganizationRequest = {
  organizationSlug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export const updateOrganization = async ({
  domain,
  name,
  shouldAttachUsersByDomain,
  organizationSlug,
}: UpdateOrganizationRequest): Promise<void> => {
  await api.put(`organizations/${organizationSlug}`, {
    json: {
      domain,
      name,
      shouldAttachUsersByDomain,
    },
  })
}
