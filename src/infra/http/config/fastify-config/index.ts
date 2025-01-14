import { fastifyPlugin } from 'fastify-plugin'

import { corsConfig } from './config-cors'
import { errorHandler } from './config-error-handler'
import { swaggerConfig } from './config-swagger'
import { transform, zodProviderConfig } from './config-zod-provider'

export const fastifyConfig = fastifyPlugin(async (fastify) => {
  await zodProviderConfig(fastify)
  await corsConfig(fastify)
  await swaggerConfig(fastify, transform)
  await errorHandler(fastify)
})
