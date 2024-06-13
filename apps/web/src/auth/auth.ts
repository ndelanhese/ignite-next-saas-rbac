import { getMembership } from '@http/get-membership'
import { getProfile } from '@http/get-profile'
import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const isAuthenticated = async () => {
  return !!cookies().get('token')?.value
}

export const getCurrentOrg = () => cookies().get('org')?.value ?? null

export const getCurrentMembership = async () => {
  const org = getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership({ organizationSlug: org })

  return membership
}

export const ability = async () => {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export const auth = async () => {
  'use server'

  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const user = await getProfile()

    return user
  } catch {}

  redirect('/api/auth/sign-in')
}
