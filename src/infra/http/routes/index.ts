import fastifyPlugin from 'fastify-plugin'

import { avatarRoutes } from './avatar'

export const routes = fastifyPlugin(async (fastify) => {
  avatarRoutes.register(fastify)
})
