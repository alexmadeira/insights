import { RouteHandler } from 'fastify'
import z from 'zod'

export const ZController = z.object({
  handler: z.custom<RouteHandler>(),
})

//
//
//

export interface IController extends z.infer<typeof ZController> {}
