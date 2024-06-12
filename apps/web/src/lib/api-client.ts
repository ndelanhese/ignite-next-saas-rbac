import { env } from '@saas/env'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.API_BASE_URL,
})
