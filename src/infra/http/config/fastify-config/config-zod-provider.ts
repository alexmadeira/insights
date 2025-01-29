import type { TFastifyInstance } from '@INFTypes/http/config/fastify'

import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

export const transform = jsonSchemaTransform

export async function configZodProvider(fastify: TFastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>()
  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)
}
