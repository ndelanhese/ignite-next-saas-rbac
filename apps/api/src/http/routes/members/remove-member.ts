import { prisma } from '@lib/prisma'
import { auth } from '@middlewares/auth'
import { UnauthorizedError } from '@routes/_errors/unauthorized-error'
import { getUserPermissions } from '@utils/get-user-permissions'
import { type FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const removeMember = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:organization_slug/members/:member_id',
      {
        schema: {
          tags: ['members'],
          summary: 'Remove a member from the organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            organization_slug: z.string(),
            member_id: z.string().uuid(),
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

        if (cannot('delete', 'User')) {
          throw new UnauthorizedError(
            "You're not allowed to remove this member from the organization.",
          )
        }

        await prisma.member.delete({
          where: {
            id: memberId,
            organizationId: organization.id,
          },
        })

        return reply.status(204).send()
      },
    )
}
