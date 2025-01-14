import { env } from '@INF/env'
import { fastify } from 'fastify'

import { fastifyConfig } from './config/fastify-config'
import { routes } from './routes'

const app = fastify()

app.register(fastifyConfig)
app.register(routes)

app.listen({ port: env.SERVER_PORT, host: '0.0.0.0' }).then((server) => {
  console.log(`Http server running in: ${server}`)
})
