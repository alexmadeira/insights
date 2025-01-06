import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import z from 'zod'

export const ZFastifyInstance =
  z.custom<
    FastifyInstance<
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      FastifyBaseLogger,
      ZodTypeProvider
    >
  >()

//
//
//

export type TFastifyInstance = z.infer<typeof ZFastifyInstance>
