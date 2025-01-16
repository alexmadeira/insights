import { drizzle } from '_INF/database/drizzle'
import { env } from '_INF/env'
import { fastify } from 'fastify'

import { fastifyConfig } from './config/fastify-config'
import { routes } from './routes'

const app = fastify()
app.register(fastifyConfig)
app.register(routes)

app.listen({ port: env.SERVER_PORT, host: '0.0.0.0' }).then((server) => {
  console.log(`Http server running in: ${server}`)
})

async function teste() {
  const companies = await drizzle.companies.findMany()
  console.log(companies)
}

teste()
// console.log(drizzle.companies.findMany())
