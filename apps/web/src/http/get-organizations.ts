import { api } from '@lib/api-client'

type Organization = {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
}

type getOrganizationsResponse = {
  organizations: Array<Organization>
}

export const getOrganizations = async () => {
  return await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
      },
    })
    .json<getOrganizationsResponse>()
}
