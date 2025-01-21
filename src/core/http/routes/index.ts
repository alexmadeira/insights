import type { FastifyInstance } from 'fastify/types/instance'

let fastifyInstance: FastifyInstance | null = null

export function routesInstance(fastify?: FastifyInstance) {
  if (fastify) fastifyInstance = fastify
  if (fastifyInstance) return fastifyInstance

  throw new Error('Fastify instance not found')
}
