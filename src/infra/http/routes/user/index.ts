import type { TFastifyInstance } from '@INFTypes/http/config/fastify'

import { RouteGroup } from '_INFServices/route'

import { authenticateByIndetifierRoute } from './authenticate-user'
import { registerByEmailRoute } from './register-user'

export async function userRoutes(fastify: TFastifyInstance) {
  const routeGroup = RouteGroup.create('user')

  routeGroup.addRoute(registerByEmailRoute)
  routeGroup.addRoute(authenticateByIndetifierRoute)

  fastify.register(routeGroup.register)
}
