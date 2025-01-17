import { PrismaService } from '_INF/database/prisma/prisma.service'

import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaService
  }
}
