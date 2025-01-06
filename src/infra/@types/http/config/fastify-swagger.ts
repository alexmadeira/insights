import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

import z from 'zod'

export const ZSwaggerTransform = z.custom<FastifyDynamicSwaggerOptions['transform']>()

//
//
//

export type TSwaggerTransform = z.infer<typeof ZSwaggerTransform>
