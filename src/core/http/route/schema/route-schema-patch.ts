import type { IRouteSchemaPatch, TRouteSchemaPatchProps } from '@CORTypes/http/route/schema/route-schema-patch'
import type { Optional } from '@CORTypes/optional'

import { RouteSchema } from './route-schema'

export class RouteSchemaPatch extends RouteSchema<TRouteSchemaPatchProps> implements IRouteSchemaPatch {
  static create(props: Optional<TRouteSchemaPatchProps, 'path'>) {
    return new RouteSchemaPatch({ ...props, path: props.path ?? '/:id' })
  }
}
