import { api } from '@lib/api-client'

type GetProfileResponse = {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export const getProfile = async () => {
  return await api.get('profile').json<GetProfileResponse>()
}
