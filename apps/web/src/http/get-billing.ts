import { api } from '@lib/api-client'

type getBillingResponse = {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

type GetBillingProps = {
  organizationSlug: string
}

export const getBilling = async ({ organizationSlug }: GetBillingProps) => {
  return await api
    .get(`organizations/${organizationSlug}/billing`)
    .json<getBillingResponse>()
}
