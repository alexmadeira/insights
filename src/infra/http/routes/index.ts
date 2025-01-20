import fastifyPlugin from 'fastify-plugin'

import { userRoutes } from './user'

export const routes = fastifyPlugin(async (fastify) => {
  userRoutes.register(fastify)
})
