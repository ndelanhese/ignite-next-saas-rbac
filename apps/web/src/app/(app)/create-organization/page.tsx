import { Header } from '@components/header'
import type { Metadata } from 'next'

import { CreateOrganizationForm } from './create-organization-form'

export const metadata: Metadata = {
  title: 'Create a new organization',
}

const CreateOrganization = () => (
  <div className="space-y-4 py-4">
    <Header />
    <main className="mx-auto w-full max-w-[75rem] space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <CreateOrganizationForm />
    </main>
  </div>
)

export default CreateOrganization
