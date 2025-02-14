import type { TFastifyInstance } from '@INFTypes/http/config/fastify'

import { RouteGroup } from '_INFServices/route'

import { authenticateByIndetifierRoute } from './authenticate-user'
import { registerByEmailRoute } from './register-user'

const routeGroup = RouteGroup.create('user')

export async function userRoutes(fastify: TFastifyInstance) {
  fastify.register(registerByEmailRoute(routeGroup).register)
  fastify.register(authenticateByIndetifierRoute(routeGroup).register)
}
