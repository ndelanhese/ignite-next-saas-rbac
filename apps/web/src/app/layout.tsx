import './globals.css'

import { cn } from '@lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import type { ReactNode } from 'react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js SaaS RBAC',
    default: 'Next.js SaaS RBAC',
  },
}

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="pt-BR" suppressHydrationWarning className="dark">
    <head />
    <body
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable,
      )}
    >
      {children}
    </body>
  </html>
)

export default RootLayout
