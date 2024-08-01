import { api } from '@lib/api-client'

type CreateInviteRequest = {
  email: string
  role: string
  organizationSlug: string
}

export const createInvite = async ({
  email,
  role,
  organizationSlug,
}: CreateInviteRequest): Promise<void> => {
  await api.post(`organizations/${organizationSlug}/invites`, {
    json: {
      email,
      role,
    },
  })
}
