import { api } from '@lib/api-client'

type Project = {
  description: string
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  organizationId: string
  ownerId: string
  createdAt: string
  owner: {
    id: string
    name: string | null
    avatarUrl: string | null
  }
}

type getOrganizationProjectsResponse = {
  projects: Array<Project>
}

export const getProjects = async (orgSlug: string) => {
  return await api
    .get(`organizations/${orgSlug}/projects`)
    .json<getOrganizationProjectsResponse>()
}
