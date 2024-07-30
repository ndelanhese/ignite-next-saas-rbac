import { api } from '@lib/api-client'

type CreateProjectRequest = {
  name: string
  description: string
  organizationSlug: string
}

export const createProject = async ({
  name,
  description,
  organizationSlug,
}: CreateProjectRequest): Promise<void> => {
  await api.post(`organizations/${organizationSlug}/projects`, {
    json: {
      name,
      description,
    },
  })
}
