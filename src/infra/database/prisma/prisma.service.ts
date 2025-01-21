import { env } from '_INF/env'
import { Prisma, PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient {
  constructor(props: Prisma.PrismaClientOptions = {}) {
    super({
      log: env.DATABASE_LOG,
      ...props,
    })
  }
}
