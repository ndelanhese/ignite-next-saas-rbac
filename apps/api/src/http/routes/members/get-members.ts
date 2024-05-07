import { prisma } from '@lib/prisma'
import { auth } from '@middlewares/auth'
import { UnauthorizedError } from '@routes/_errors/unauthorized-error'
import { roleSchema } from '@saas/auth'
import { getUserPermissions } from '@utils/get-user-permissions'
import { type FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const getMembers = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:organization_slug/members',
      {
        schema: {
          tags: ['members'],
          summary: 'Get all organization members',
          security: [{ bearerAuth: [] }],
          params: z.object({
            organization_slug: z.string(),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().url().nullable(),
                  email: z.string().email(),
                  userId: z.string(),
                  role: roleSchema,
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { organization_slug: organizationSlug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(organizationSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            "You're not allowed to see organization members.",
          )
        }

        const members = await prisma.member.findMany({
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            role: 'asc',
          },
        })

        const memberWithRoles = members.map(
          ({ user: { id: userId, ...user }, ...member }) => ({
            ...member,
            ...user,
            userId,
          }),
        )

        return reply.status(200).send({
          members: memberWithRoles,
        })
      },
    )
}
