import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string({ required_error: 'API base URL is required' }).url(),
})

export const env = envSchema.parse(process.env)
