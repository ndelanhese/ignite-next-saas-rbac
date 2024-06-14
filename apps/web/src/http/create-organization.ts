import { api } from '@lib/api-client'

type CreateOrganizationRequest = {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export const createOrganization = async ({
  domain,
  name,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest): Promise<void> => {
  await api.post('organizations', {
    json: {
      domain,
      name,
      shouldAttachUsersByDomain,
    },
  })
}
