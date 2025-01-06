import type { RouteSchemaDelete } from '_COR/http/route/schema/route-schema-delete'
import type { RouteSchemaGet } from '_COR/http/route/schema/route-schema-get'
import type { RouteSchemaPatch } from '_COR/http/route/schema/route-schema-patch'
import type { RouteSchemaPost } from '_COR/http/route/schema/route-schema-post'
import type { RouteSchemaPut } from '_COR/http/route/schema/route-schema-put'

import z from 'zod'

export const ZRouteMethodSchema = z.object({
  PUT: z.custom<RouteSchemaPut>(),
  POST: z.custom<RouteSchemaPost>(),
  PATCH: z.custom<RouteSchemaPatch>(),
  GET: z.custom<RouteSchemaGet>(),
  DELETE: z.custom<RouteSchemaDelete>(),
})

export const ZRoutes = z.object({
  create: z
    .object({
      PUT: z.custom<RouteSchemaPut>(),
      POST: z.custom<RouteSchemaPost>(),
      PATCH: z.custom<RouteSchemaPatch>(),
      GET: z.custom<RouteSchemaGet>(),
      DELETE: z.custom<RouteSchemaDelete>(),
    })
    .optional(),
})

//
//
//

export type TRouteMethodSchema = z.infer<typeof ZRouteMethodSchema>

export interface IRoutes extends z.infer<typeof ZRoutes> {}
