import type { TMethodProps } from './methods'
import type { Method } from '_COR/http/routes/methods/method'
import type { RouteHandler } from 'fastify'

import z from 'zod'

import { ZMethodDeleteProps } from './methods/method-delete'
import { ZMethodGetProps } from './methods/method-get'
import { ZMethodPatchProps } from './methods/method-patch'
import { ZMethodPostProps } from './methods/method-post'
import { ZMethodPutProps } from './methods/method-put'

export const ZRouteGetProps = ZMethodGetProps.omit({ pathPrefix: true, type: true })
export const ZRoutePostProps = ZMethodPostProps.omit({ pathPrefix: true, type: true })
export const ZRoutePutProps = ZMethodPutProps.omit({ pathPrefix: true, type: true })
export const ZRoutePatchProps = ZMethodPatchProps.omit({ pathPrefix: true, type: true })
export const ZRouteDeleteProps = ZMethodDeleteProps.omit({ pathPrefix: true, type: true })

export const ZRouteBuildRouteProps = z.tuple([z.custom<Method<TMethodProps>>(), z.custom<RouteHandler>()])

export const ZRouteProps = z
  .string()
  .optional()
  .transform((path = '/') => {
    return `/${path}`.replace(/\/\/+/g, '/')
  })
export const ZRoute = z.object({})

//
//
//

export type TRouteBuildRouteProps = z.infer<typeof ZRouteBuildRouteProps>

export type TRouteGetProps = z.infer<typeof ZRouteGetProps>
export type TRoutePostProps = z.infer<typeof ZRoutePostProps>
export type TRoutePutProps = z.infer<typeof ZRoutePutProps>
export type TRoutePatchProps = z.infer<typeof ZRoutePatchProps>
export type TRouteDeleteProps = z.infer<typeof ZRouteDeleteProps>

export type TRouteProps = z.infer<typeof ZRouteProps>
export interface IRoute extends z.infer<typeof ZRoute> {}
