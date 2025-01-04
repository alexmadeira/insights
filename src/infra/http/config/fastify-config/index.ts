import { fastifyPlugin } from 'fastify-plugin'

import { corsConfig } from './config-cors'
import { swaggerConfig } from './config-swagger'

export const fastifyConfig = fastifyPlugin(async (fastify) => {
  await corsConfig(fastify)
  await swaggerConfig(fastify)
})
