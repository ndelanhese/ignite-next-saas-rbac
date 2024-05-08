import { prisma } from '@lib/prisma'
import { auth } from '@middlewares/auth'
import { BadRequestError } from '@routes/_errors/bad-request-error'
import { NotFoundError } from '@routes/_errors/not-found-error'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const rejectInvite = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/invites/:invite_id/reject',
      {
        schema: {
          tags: ['invites'],
          summary: 'Reject an invite',
          params: z.object({
            invite_id: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { invite_id: inviteId } = request.params

        const invite = await prisma.invite.findUnique({
          where: {
            id: inviteId,
          },
        })

        if (!invite) {
          throw new NotFoundError('Invite not found or expired.')
        }

        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new BadRequestError('User not found')
        }

        if (invite.email !== user.email) {
          throw new BadRequestError('This invite belongs to another user')
        }

        await prisma.invite.delete({
          where: {
            id: inviteId,
          },
        })

        return reply.status(204).send()
      },
    )
}
