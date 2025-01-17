import type { FastifyInstance } from 'fastify'

import { fastifyCors } from '@fastify/cors'

export async function configCors(fastify: FastifyInstance) {
  fastify.register(fastifyCors, { origin: '*' })
}
