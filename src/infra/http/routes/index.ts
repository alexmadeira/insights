import fastifyPlugin from 'fastify-plugin'

import { userRoutes } from './user'

export const routes = fastifyPlugin(async (fastify) => {
  fastify.register(userRoutes)
})
