import z from 'zod'

import { ZRouteSchema, ZRouteSchemaProps } from './route-schema'

export const ZRouteSchemaGetProps = ZRouteSchemaProps.extend({
  body: z.undefined(),
})

export const ZRouteSchemaGet = ZRouteSchema.extend({})

//
//
//

export type TRouteSchemaGetProps = z.infer<typeof ZRouteSchemaGetProps>
export interface IRouteSchemaGet extends z.infer<typeof ZRouteSchemaGet> {}
