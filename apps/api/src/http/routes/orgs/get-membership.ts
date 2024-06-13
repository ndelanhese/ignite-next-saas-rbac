import { auth } from '@middlewares/auth'
import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const getMembership = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:organization_slug/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get user membership on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            organization_slug: z.string(),
          }),
          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                role: roleSchema,
                userId: z.string().uuid(),
                organizationId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { organization_slug: slug } = request.params
        const { membership } = await request.getUserMembership(slug)

        return reply.status(200).send({
          membership: {
            id: membership.id,
            role: membership.role,
            userId: membership.userId,
            organizationId: membership.organizationId,
          },
        })
      },
    )
}
