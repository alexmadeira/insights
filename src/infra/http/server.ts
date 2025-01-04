import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'

const app = fastify()

app.register(fastifyCors, { origin: '*' })

app.get('/', async () => {
  return 'Hello insights'
})

app.listen({ port: 3333 }).then(() => {
  console.log('Http server running!')
})
