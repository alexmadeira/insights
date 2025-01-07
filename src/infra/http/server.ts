import { fastify } from 'fastify'

import { fastifyConfig } from './config/fastify-config'
import { routes } from './routes'

const app = fastify()

app.register(fastifyConfig)
app.register(routes)

app.listen({ port: 3333 }).then(() => {
  console.log('Http server running!')
})
