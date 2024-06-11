'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string({ required_error: 'Please, provide an e-mail address' })
    .email({ message: 'Please, provide a valid e-mail address' }),
  password: z.string().min(1, 'Provide your password'),
})

export const signInWithEmailAndPassword = async (
  _: unknown,
  data: FormData,
) => {
  const parsedData = signInSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData?.error?.flatten()?.fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, password } = parsedData.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    console.log(token)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
