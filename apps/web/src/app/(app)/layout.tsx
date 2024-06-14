import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { isAuthenticated } from '@/auth/auth'

type AppLayoutProps = Readonly<{
  children: ReactNode
  sheet: ReactNode
}>

const AppLayout = async ({ children, sheet }: AppLayoutProps) => {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}

export default AppLayout
