import type { IRouteSchemaGet, TRouteSchemaGetProps } from '@CORTypes/http/route/schema/route-schema-get'
import type { Optional } from '@CORTypes/optional'

import { RouteSchema } from './route-schema'

export class RouteSchemaGet extends RouteSchema<TRouteSchemaGetProps> implements IRouteSchemaGet {
  static create(props: Optional<TRouteSchemaGetProps, 'path'>) {
    return new RouteSchemaGet({ ...props, path: props.path ?? '/:id' })
  }
}
