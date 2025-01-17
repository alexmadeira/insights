import { fastifyPlugin } from 'fastify-plugin'

import { configCors } from './config-cors'
import { configDatabase } from './config-database'
import { configSwagger } from './config-swagger'
import { configZodProvider, transform } from './config-zod-provider'

export const fastifyConfig = fastifyPlugin(async (fastify) => {
  await configDatabase(fastify)
  await configCors(fastify)
  await configZodProvider(fastify)
  await configSwagger(fastify, transform)
})
