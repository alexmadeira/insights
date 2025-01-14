import type { TFastifyInstance } from '@INFTypes/http/config/fastify'

import { ZodError } from 'zod'

export async function errorHandler(fastify: TFastifyInstance) {
  fastify.setErrorHandler((error, _request, reply) => {
    console.log(error instanceof ZodError)
    console.log(error.code)
    reply.code(200).send('erro')
  })
}
