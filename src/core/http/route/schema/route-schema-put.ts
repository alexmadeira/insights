import type { IRouteSchemaPut, TRouteSchemaPutProps } from '@CORTypes/http/route/schema/route-schema-put'
import type { Optional } from '@CORTypes/optional'

import { RouteSchema } from './route-schema'

export class RouteSchemaPut extends RouteSchema<TRouteSchemaPutProps> implements IRouteSchemaPut {
  static create(props: Optional<TRouteSchemaPutProps, 'path'>) {
    return new RouteSchemaPut({ ...props, path: props.path ?? '/:id' })
  }
}
