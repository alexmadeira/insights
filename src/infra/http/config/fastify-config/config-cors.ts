import type { FastifyInstance } from 'fastify'

import { fastifyCors } from '@fastify/cors'

export async function corsConfig(fastify: FastifyInstance) {
  fastify.register(fastifyCors, { origin: '*' })
}
