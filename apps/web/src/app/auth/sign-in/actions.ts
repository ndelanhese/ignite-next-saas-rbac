'use server'

import { acceptInvite } from '@http/accept-invite'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string({ required_error: 'Please, provide an e-mail address' })
    .email({ message: 'Please, provide a valid e-mail address' }),
  password: z.string().min(1, 'Provide your password'),
})

export const signInWithEmailAndPassword = async (data: FormData) => {
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

    const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7

    cookies().set('token', token, {
      path: '/',
      maxAge: SEVEN_DAYS_IN_SECONDS,
    })

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite({ inviteId })
        cookies().delete('inviteId')
      } catch (error) {
        console.error(error)
      }
    }
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
