import z from 'zod'

import { ZRouteSchema, ZRouteSchemaProps } from './route-schema'

export const ZRouteSchemaDeleteProps = ZRouteSchemaProps.extend({
  body: z.undefined(),
})

export const ZRouteSchemaDelete = ZRouteSchema.extend({})

//
//
//

export type TRouteSchemaDeleteProps = z.infer<typeof ZRouteSchemaDeleteProps>
export interface IRouteSchemaDelete extends z.infer<typeof ZRouteSchemaDelete> {}
