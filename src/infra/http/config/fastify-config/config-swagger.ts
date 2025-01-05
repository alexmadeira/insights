import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

export async function swaggerConfig(fastify: FastifyInstance) {
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
    },
  })

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    theme: {
      title: 'Insights | Swagger Doc',
    },
  })
}
