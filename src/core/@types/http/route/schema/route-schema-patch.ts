import z from 'zod'

import { ZRouteSchema, ZRouteSchemaBody, ZRouteSchemaProps } from './route-schema'

export const ZRouteSchemaPatchProps = ZRouteSchemaProps.extend({
  body: ZRouteSchemaBody,
})

export const ZRouteSchemaPatch = ZRouteSchema.extend({})

//
//
//

export type TRouteSchemaPatchProps = z.infer<typeof ZRouteSchemaPatchProps>
export interface IRouteSchemaPatch extends z.infer<typeof ZRouteSchemaPatch> {}
