import type { ReactNode } from 'react'

import { Header } from '@components/header'
import { Tabs } from '@components/tabs'

type OrgLayoutProps = Readonly<{
  children: ReactNode
}>

const OrgLayout = async ({ children }: OrgLayoutProps) => {
  return (
    <div>
      <div className="pt-4">
        <Header />
        <Tabs />
      </div>

      <main className="mx-auto w-full max-w-[75rem] py-4">{children}</main>
    </div>
  )
}

export default OrgLayout
