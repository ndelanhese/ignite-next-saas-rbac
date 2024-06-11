import { api } from '@lib/api-client'

type SignInWithPasswordRequest = {
  email: string
  password: string
}
type SignInWithPasswordResponse = {
  token: string
}

export const signInWithPassword = async ({
  email,
  password,
}: SignInWithPasswordRequest) => {
  return await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()
}
