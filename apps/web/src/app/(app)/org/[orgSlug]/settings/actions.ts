'use server'

import { getCurrentOrg } from '@auth/auth'
import { updateOrganization } from '@http/update-organization'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const updateOrganizationSchema = z
  .object({
    name: z.string().min(4, 'Please include at least 4 characters.'),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

            return domainRegex.test(value)
          }

          return true
        },
        { message: 'Please, enter a valid domain.' },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

export type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>

export const updateOrganizationAction = async (data: FormData) => {
  const parsedData = updateOrganizationSchema.safeParse(
    Object.fromEntries(data),
  )
  const currentOrganization = getCurrentOrg()

  if (!parsedData.success) {
    const errors = parsedData?.error?.flatten()?.fieldErrors
    return { success: false, message: null, errors }
  }

  const { domain, name, shouldAttachUsersByDomain } = parsedData.data

  try {
    await updateOrganization({
      domain,
      name,
      shouldAttachUsersByDomain,
      organizationSlug: currentOrganization!,
    })

    revalidateTag('organizations')
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
    message: 'Successfully saved the organization',
    errors: null,
  }
}
