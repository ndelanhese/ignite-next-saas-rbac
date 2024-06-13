import { api } from '@lib/api-client'

type SignUpRequest = {
  name: string
  email: string
  password: string
}

export const signUp = async ({
  email,
  password,
  name,
}: SignUpRequest): Promise<void> => {
  await api.post('users', {
    json: {
      email,
      password,
      name,
    },
  })
}
