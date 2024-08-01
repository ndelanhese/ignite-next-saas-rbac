'use server'

import { getCurrentOrg } from '@auth/auth'
import { createInvite } from '@http/create-invite'
import { removeMember } from '@http/remove-member'
import { revokeInvite } from '@http/revoke-invite'
import { updateMember } from '@http/update-member'
import { type Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const removeMemberAction = async (memberId: string) => {
  const currentOrg = getCurrentOrg()

  await removeMember({ memberId, organizationSlug: currentOrg! })

  revalidateTag(`${currentOrg}-members`)
}

export const updateMemberAction = async (memberId: string, role: Role) => {
  const currentOrg = getCurrentOrg()

  await updateMember({ memberId, organizationSlug: currentOrg!, role })

  revalidateTag(`${currentOrg}-members`)
}

export const revokeInviteActions = async (inviteId: string) => {
  const currentOrg = getCurrentOrg()

  await revokeInvite({ inviteId, organizationSlug: currentOrg! })

  revalidateTag(`${currentOrg}-invites`)
}

const createInviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
})

export const createInviteAction = async (data: FormData) => {
  const currentOrg = getCurrentOrg()
  console.log(data)
  const parsedData = createInviteSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData?.error?.flatten()?.fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, role } = parsedData.data
  try {
    await createInvite({
      email,
      role,
      organizationSlug: getCurrentOrg()!,
    })

    revalidateTag(`${currentOrg}-invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully created the invite',
    errors: null,
  }
}
