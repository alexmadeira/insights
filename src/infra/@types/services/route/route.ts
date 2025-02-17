import type { RouteGroup } from '_INFServices/route'
import type { IController } from '@INFTypes/http/controller'
import type { RouteOptions } from 'fastify'

import { IRoutePipe } from '_INFHttp/pipes/verify-jwt'
import { ZEHttpMethods } from '@CORTypes/enums/http'
import z from 'zod'

export const ZRouteDetails = z.object({
  groups: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  operationId: z.string(),
})

export const ZRouteSchema = ZRouteDetails.extend({
  body: z.custom<z.ZodSchema>(),
  params: z.custom<z.ZodSchema>(),
  headers: z.custom<z.ZodSchema>(),
  querystring: z.custom<z.ZodSchema>(),
})

export const ZRouteRequest = z.object({
  method: ZEHttpMethods,
  path: z.string(),
  controller: z.custom<IController>(),
  pipes: z.object({
    onRequest: z.union([z.custom<IRoutePipe>(), z.array(z.custom<IRoutePipe>())]).optional(),
  }),
})

export const ZRouteProps = ZRouteSchema.partial({
  groups: true,
  operationId: true,
})
  .merge(ZRouteRequest.partial({ path: true }))
  .extend({
    routeGroup: z.custom<RouteGroup>().optional(),
  })

export const ZRouteGetProps = ZRouteProps.omit({
  body: true,
  method: true,
}).partial({ pipes: true, params: true, headers: true, querystring: true })

export const ZRouteEditProps = ZRouteProps.omit({
  method: true,
}).partial({ pipes: true, params: true, headers: true, querystring: true })

export const ZRouteSendProps = ZRouteProps.omit({
  method: true,
}).partial({ pipes: true, params: true, headers: true, querystring: true })

export const ZRouteRemoveProps = ZRouteProps.omit({
  method: true,
}).partial({ pipes: true, body: true, params: true, headers: true, querystring: true })

export const ZRoute = z.object({
  method: ZEHttpMethods,
  path: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  operationId: z.string(),
  body: z.custom<z.ZodSchema>().optional(),
  params: z.custom<z.ZodSchema>().optional(),
  querystring: z.custom<z.ZodSchema>().optional(),
  headers: z.custom<z.ZodSchema>().optional(),
  schema: z.custom<RouteOptions['schema']>(),
})

//
//
//

export type TRouteDetails = z.infer<typeof ZRouteDetails>
export type TRouteSchema = z.infer<typeof ZRouteSchema>
export type TRouteRequest = z.infer<typeof ZRouteRequest>
export type TRouteProps = z.infer<typeof ZRouteProps>

export type TRouteGetProps = z.infer<typeof ZRouteGetProps>
export type TRouteEditProps = z.infer<typeof ZRouteEditProps>
export type TRouteSendProps = z.infer<typeof ZRouteSendProps>
export type TRouteRemoveProps = z.infer<typeof ZRouteRemoveProps>

export interface IRoute extends z.infer<typeof ZRoute> {}
