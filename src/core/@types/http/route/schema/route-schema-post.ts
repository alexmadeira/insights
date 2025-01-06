import z from 'zod'

import { ZRouteSchema, ZRouteSchemaProps } from './route-schema'

export const ZRouteSchemaPostProps = ZRouteSchemaProps.extend({})

export const ZRouteSchemaPost = ZRouteSchema.extend({})

//
//
//

export type TRouteSchemaPostProps = z.infer<typeof ZRouteSchemaPostProps>
export interface IRouteSchemaPost extends z.infer<typeof ZRouteSchemaPost> {}
