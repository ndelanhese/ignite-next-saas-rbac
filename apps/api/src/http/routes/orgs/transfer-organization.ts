import { prisma } from '@lib/prisma'
import { auth } from '@middlewares/auth'
import { BadRequestError } from '@routes/_errors/bad-request-error'
import { UnauthorizedError } from '@routes/_errors/unauthorized-error'
import { organizationSchema } from '@saas/auth'
import { getUserPermissions } from '@utils/get-user-permissions'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const transferOrganization = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:organization_slug/owner',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Transfer organization ownership',
          security: [{ bearerAuth: [] }],
          body: z.object({
            transferToUserId: z.string().uuid(),
          }),
          params: z.object({
            organization_slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { organization_slug: slug } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = organizationSchema.parse(organization)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('transfer_ownership', authOrganization)) {
          throw new UnauthorizedError(
            "You're not allowed to transfer this organization ownership.",
          )
        }

        const { transferToUserId } = request.body

        const transferToMembership = await prisma.member.findUnique({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId: transferToUserId,
            },
          },
        })

        if (!transferToMembership) {
          throw new BadRequestError(
            'Target user is not a member of this organization.',
          )
        }

        await prisma.$transaction([
          prisma.member.update({
            where: {
              organizationId_userId: {
                organizationId: organization.id,
                userId: transferToUserId,
              },
            },
            data: {
              role: 'ADMIN',
            },
          }),
          prisma.organization.update({
            where: { id: organization.id },
            data: { ownerId: transferToUserId },
          }),
        ])

        return reply.status(204).send()
      },
    )
}
