import { fastifyPlugin } from 'fastify-plugin'

import { configCors } from './config-cors'
import { configSwagger } from './config-swagger'
import { configZodProvider, jsonSchemaTransform } from './config-zod-provider'

export const fastifyConfig = fastifyPlugin(async (fastify) => {
  await configCors(fastify)
  await configZodProvider(fastify)
  await configSwagger(fastify, jsonSchemaTransform)
})
