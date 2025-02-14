import fastifyPlugin from 'fastify-plugin'

import { avatarRoutes } from './user'

export const routes = fastifyPlugin(async (fastify) => {
  fastify.register(avatarRoutes)
})
