import { prisma } from '@lib/prisma'
import { auth } from '@middlewares/auth'
import { UnauthorizedError } from '@routes/_errors/unauthorized-error'
import { roleSchema } from '@saas/auth'
import { getUserPermissions } from '@utils/get-user-permissions'
import { type FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const updateMember = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:organization_slug/members/:member_id',
      {
        schema: {
          tags: ['members'],
          summary: 'Update a member',
          security: [{ bearerAuth: [] }],
          params: z.object({
            organization_slug: z.string(),
            member_id: z.string().uuid(),
          }),
          body: z.object({
            role: roleSchema,
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { organization_slug: organizationSlug, member_id: memberId } =
          request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(organizationSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('update', 'User')) {
          throw new UnauthorizedError(
            "You're not allowed to update this member.",
          )
        }

        const { role } = request.body

        await prisma.member.update({
          data: {
            role,
          },
          where: {
            id: memberId,
            organizationId: organization.id,
          },
        })

        return reply.status(204).send()
      },
    )
}
