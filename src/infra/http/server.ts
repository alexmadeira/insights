import { fastify } from 'fastify'

import { fastifyConfig } from './config/fastify-config'

const app = fastify()

app.register(fastifyConfig)

app.get('/', async () => {
  return 'Hello insights'
})

app.listen({ port: 3333 }).then(() => {
  console.log('Http server running!')
})
