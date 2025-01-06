import { Route } from '_COR/http/route'
import fastifyPlugin from 'fastify-plugin'

import { userRoutes } from './user'

export const routes = fastifyPlugin(async (fastify) => {
  fastify.register(Route.create(userRoutes, '/user'))
})
