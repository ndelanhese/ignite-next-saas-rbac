'use server'

import { signUp } from '@http/sign-up'
import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: 'Please, provide your name' })
      .refine((value) => value.split(' ').length > 1, {
        message: 'Please, enter your full name',
      }),
    email: z
      .string({ required_error: 'Please, provide an e-mail address' })
      .email({ message: 'Please, provide a valid e-mail address' }),
    password: z
      .string()
      .min(1, 'Provide your password')
      .min(6, 'Password should have at least 6 characters.'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match',
    path: ['password_confirmation'],
  })

export const signUpAction = async (data: FormData) => {
  const parsedData = signUpSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData?.error?.flatten()?.fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, password, name } = parsedData.data

  try {
    await signUp({
      email,
      password,
      name,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  redirect('/')
}
