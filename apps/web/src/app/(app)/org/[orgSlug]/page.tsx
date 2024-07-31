import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organization',
}

const Organization = async () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Organization</h1>
    </div>
  )
}

export default Organization
