import { ZFastifyInstance } from '@INFTypes/http/config/fastify'
import z from 'zod'

export const ZRouteGroupName = z.union([z.string(), z.array(z.string())])
export const ZRouteGroupRoute = z.function(z.tuple([ZFastifyInstance])).returns(z.void())
export const ZRouteGroupBasePath = z.string()

export const ZRouteGroupProps = z.object({
  name: ZRouteGroupName,
  basePath: ZRouteGroupBasePath,
})

export const ZRouteGroup = z.object({
  name: ZRouteGroupName,
  basePath: ZRouteGroupBasePath,
})

//
//
//

export type TRouteGroupName = z.infer<typeof ZRouteGroupName>
export type TRouteGroupBasePath = z.infer<typeof ZRouteGroupBasePath>
export type TRouteGroupRoute = z.infer<typeof ZRouteGroupRoute>

export type TRouteGroupProps = z.infer<typeof ZRouteGroupProps>
export interface IRouteGroup extends z.infer<typeof ZRouteGroup> {}
