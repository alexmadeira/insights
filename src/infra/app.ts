import { routes } from '_INF/http/routes'
import { fastify } from 'fastify'

import { fastifyConfig } from './config/fastify-config'

export const app = fastify()

app.register(fastifyConfig)
app.register(routes)
