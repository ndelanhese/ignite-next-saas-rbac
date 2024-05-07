import { prisma } from '@lib/prisma'
import { auth } from '@middlewares/auth'
import { UnauthorizedError } from '@routes/_errors/unauthorized-error'
import { createSlug } from '@utils/create-slug'
import { getUserPermissions } from '@utils/get-user-permissions'
import { type FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const createProject = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:organization_slug/project',
      {
        schema: {
          tags: ['projects'],
          summary: 'Create a new project',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            organization_slug: z.string(),
          }),
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { organization_slug: slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(
            "You're not allowed to create a new project.",
          )
        }

        const { name, description } = request.body

        let projectSlug = createSlug(name)

        const organizationBySlug = await prisma.organization.findUnique({
          where: { slug: projectSlug },
        })

        if (organizationBySlug) {
          projectSlug = createSlug(`${name} ${new Date().getTime()}`)
        }

        const project = await prisma.project.create({
          data: {
            name,
            slug: projectSlug,
            description,
            organizationId: organization.id,
            ownerId: userId,
          },
        })

        return reply.status(201).send({
          projectId: project.id,
        })
      },
    )
}
