import { Header } from '@components/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organization',
}

const Organization = async () => {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[75rem] space-y-4">
        <h1>Organization</h1>
      </main>
    </div>
  )
}

export default Organization
