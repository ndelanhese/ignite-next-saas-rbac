import { Header } from '@components/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

const Home = () => {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[75rem] space-y-4">
        <p className="text-sm text-muted-foreground">Select an organization</p>
      </main>
    </div>
  )
}

export default Home
