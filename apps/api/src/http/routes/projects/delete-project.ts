import { prisma } from '@lib/prisma'
import { auth } from '@middlewares/auth'
import { BadRequestError } from '@routes/_errors/bad-request-error'
import { UnauthorizedError } from '@routes/_errors/unauthorized-error'
import { projectSchema } from '@saas/auth'
import { getUserPermissions } from '@utils/get-user-permissions'
import { type FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteProject = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:organization_slug/projects/:project_slug',
      {
        schema: {
          tags: ['projects'],
          summary: 'Delete a project',
          security: [{ bearerAuth: [] }],
          params: z.object({
            organization_slug: z.string(),
            project_slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { organization_slug: slug, project_slug: projectSlug } =
          request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const project = await prisma.project.findUnique({
          where: { slug: projectSlug, organizationId: organization.id },
        })

        if (!project) {
          throw new BadRequestError('Project not found.')
        }

        const { cannot } = getUserPermissions(userId, membership.role)
        const authProject = projectSchema.parse(project)

        if (cannot('delete', authProject)) {
          throw new UnauthorizedError(
            "You're not allowed to delete this project.",
          )
        }

        await prisma.project.delete({
          where: { slug: projectSlug, organizationId: organization.id },
        })

        return reply.status(204).send()
      },
    )
}
