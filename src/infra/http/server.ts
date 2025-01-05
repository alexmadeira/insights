import { fastify } from 'fastify'

import { fastifyConfig } from './config/fastify-config'

const app = fastify()

app.register(fastifyConfig)

app.post(
  '/',
  {
    schema: {
      tags: ['testes'],
      summary: 'Create a user',
      body: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
          obj: {
            type: 'object',
            properties: {
              some: { type: 'string' },
            },
          },
        },
      },
    },
  },
  async () => {
    return 'Hello insights'
  },
)

app.listen({ port: 3333 }).then(() => {
  console.log('Http server running!')
})
