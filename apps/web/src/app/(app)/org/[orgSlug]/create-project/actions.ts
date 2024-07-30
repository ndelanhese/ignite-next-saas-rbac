'use server'

import { getCurrentOrg } from '@auth/auth'
import { createProject } from '@http/create-project'
import { HTTPError } from 'ky'
import { z } from 'zod'

const createProjectSchema = z.object({
  name: z.string().min(4, 'Please include at least 4 characters.'),
  description: z.string(),
})

export const createProjectAction = async (data: FormData) => {
  const parsedData = createProjectSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData?.error?.flatten()?.fieldErrors
    return { success: false, message: null, errors }
  }

  const { description, name } = parsedData.data

  try {
    await createProject({
      description,
      name,
      organizationSlug: getCurrentOrg()!,
    })
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
    message: 'Successfully saved the project',
    errors: null,
  }
}
