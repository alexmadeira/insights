import type { IRouteSchemaDelete, TRouteSchemaDeleteProps } from '@CORTypes/http/route/schema/route-schema-delete'
import type { Optional } from '@CORTypes/optional'

import { RouteSchema } from './route-schema'

export class RouteSchemaDelete extends RouteSchema<TRouteSchemaDeleteProps> implements IRouteSchemaDelete {
  static create(props: Optional<TRouteSchemaDeleteProps, 'path'>) {
    return new RouteSchemaDelete({ ...props, path: props.path ?? '/:id' })
  }
}
