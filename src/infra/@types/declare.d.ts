import { Route } from '_COR/http/route'
import { PrismaService } from '_INF/database/prisma/prisma.service'

import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    db: PrismaService
    routes: Route
  }
}
declare module NodeJS {
  export interface Global {
    __base_path: string
    __helpers_path: string
    __emails_path: string
    __config: string
  }
}
