'use client'

import { ThemeProvider } from '@components/theme/theme-provider'
import { queryClient } from '@lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

type ProvidersProps = Readonly<{
  children: ReactNode
}>

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  </QueryClientProvider>
)
