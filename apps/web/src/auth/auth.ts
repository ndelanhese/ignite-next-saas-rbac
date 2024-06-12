'use server'

import { cookies } from 'next/headers'

export const isAuthenticated = async () => {
  return !!cookies().get('token')?.value
}
