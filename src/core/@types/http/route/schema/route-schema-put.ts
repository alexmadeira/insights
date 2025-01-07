import z from 'zod'

import { ZRouteSchema, ZRouteSchemaBody, ZRouteSchemaProps } from './route-schema'

export const ZRouteSchemaPutProps = ZRouteSchemaProps.extend({
  body: ZRouteSchemaBody,
})

export const ZRouteSchemaPut = ZRouteSchema.extend({})

//
//
//

export type TRouteSchemaPutProps = z.infer<typeof ZRouteSchemaPutProps>
export interface IRouteSchemaPut extends z.infer<typeof ZRouteSchemaPut> {}
