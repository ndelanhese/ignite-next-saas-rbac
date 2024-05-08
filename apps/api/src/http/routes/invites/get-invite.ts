import { prisma } from '@lib/prisma'
import { NotFoundError } from '@routes/_errors/not-found-error'
import { roleSchema } from '@saas/auth'
import { type FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const getInvite = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/invites/:invite_id',
    {
      schema: {
        tags: ['invites'],
        summary: 'Get invite details',
        params: z.object({
          invite_id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            invite: z.object({
              id: z.string().uuid(),
              email: z.string().email(),
              role: roleSchema,
              createdAt: z.date(),
              author: z
                .object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().url().nullable(),
                })
                .nullable(),
              organization: z.object({
                name: z.string(),
              }),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { invite_id: inviteId } = request.params

      const invite = await prisma.invite.findUnique({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          organization: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: inviteId,
        },
      })

      if (!invite) {
        throw new NotFoundError('Invite not found.')
      }

      return reply.status(200).send({
        invite,
      })
    },
  )
}
