import { RouteHandler } from 'fastify'
import z from 'zod'

export const ZController = z.object({
  handle: z.custom<RouteHandler>(),
})

//
//
//

export interface IController extends z.infer<typeof ZController> {}
