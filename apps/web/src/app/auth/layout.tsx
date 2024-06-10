import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'auth',
}

type AuthLayoutProps = Readonly<{
  children: ReactNode
}>

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center px-4">
    <div className="w-full max-w-xs">{children}</div>
  </div>
)

export default AuthLayout
