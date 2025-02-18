import type { onRequestAsyncHookHandler } from 'fastify'

import z from 'zod'

export const ZPipe = z.object({
  handler: z.custom<onRequestAsyncHookHandler>(),
})

//
//
//

export interface IPipe extends z.infer<typeof ZPipe> {}
