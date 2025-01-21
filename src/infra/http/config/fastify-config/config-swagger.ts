import type { TFastifyInstance } from '@INFTypes/http/config/fastify'
import type { TSwaggerTransform } from '@INFTypes/http/config/fastify-swagger'

import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

export async function configSwagger(fastify: TFastifyInstance, transform: TSwaggerTransform) {
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Insights api',
        description: 'Insights description swagger api',
        version: '1.0.0',
      },
    },
    transform,
  })

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    logLevel: 'debug',
    uiConfig: {
      operationsSorter: 'method',
      defaultModelExpandDepth: 2,
    },
    theme: {
      title: 'Insights | Swagger Doc',
    },
  })
}
