import { getProfile } from '@http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const isAuthenticated = async () => {
  return !!cookies().get('token')?.value
}

export const auth = async () => {
  'use server'

  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const user = await getProfile()

    return user
  } catch {}

  redirect('/api/auth/sign-in')
}
