import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

export const metadata: Metadata = {
  title: 'auth',
}

type AppLayoutProps = Readonly<{
  children: ReactNode
}>

const AppLayout = async ({ children }: AppLayoutProps) => {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}

export default AppLayout
