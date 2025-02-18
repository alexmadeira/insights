import type { RequestSchemaProps } from '@INFTypes/common/request-schema'
import type { ZodTypeAny } from 'zod'

import { RequestSchema } from '_INF/services/request-schema'
import z from 'zod'

export function mockRequestSchema(
  overrides?: Partial<
    RequestSchemaProps<ZodTypeAny | undefined, ZodTypeAny | undefined, ZodTypeAny | undefined, ZodTypeAny | undefined>
  >,
) {
  return RequestSchema({
    body: z.object({
      name: z.string(),
    }),
    params: z.object({
      id: z.string(),
    }),
    querystring: z.object({
      include: z.string(),
    }),
    ...overrides,
  })
}
