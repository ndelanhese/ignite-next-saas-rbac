import { api } from '@lib/api-client'

type SignInWithGithubRequest = {
  code: string
}
type SignInWithGithubResponse = {
  token: string
}

export const signInWithGithub = async ({ code }: SignInWithGithubRequest) => {
  return await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGithubResponse>()
}
