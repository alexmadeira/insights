import type { IRouteSchemaPost, TRouteSchemaPostProps } from '@CORTypes/http/route/schema/route-schema-post'
import type { Optional } from '@CORTypes/optional'

import { RouteSchema } from './route-schema'

export class RouteSchemaPost extends RouteSchema<TRouteSchemaPostProps> implements IRouteSchemaPost {
  static create(props: Optional<TRouteSchemaPostProps, 'path'>) {
    return new RouteSchemaPost({ ...props, path: props.path ?? '' })
  }
}
