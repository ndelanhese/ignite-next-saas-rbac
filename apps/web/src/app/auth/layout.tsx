import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

export const metadata: Metadata = {
  title: 'auth',
}

type AuthLayoutProps = Readonly<{
  children: ReactNode
}>

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  if (await isAuthenticated()) {
    redirect('/')
  }

  console.log(process.env)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}

export default AuthLayout
