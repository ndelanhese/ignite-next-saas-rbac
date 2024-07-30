'use server'

import { api } from '@lib/api-client'

type ShutdownOrganizationProps = {
  orgSlug: string
}

export const shutdownOrganization = async ({
  orgSlug,
}: ShutdownOrganizationProps) => {
  await api.delete(`organizations/${orgSlug}`)
}
