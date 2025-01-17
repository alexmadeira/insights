import type { FastifyInstance } from 'fastify'

import { PrismaService } from '_INF/database/prisma/prisma.service'

export async function configDatabase(fastify: FastifyInstance) {
  fastify.decorate('db', new PrismaService())

  fastify.addHook('onListen', async () => {
    fastify.db.$connect()
  })

  fastify.addHook('onClose', async (app) => {
    console.log('asd')
    app.db.$disconnect()
  })
}
