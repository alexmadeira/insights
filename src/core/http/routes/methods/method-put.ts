import type { IMethodPut, TMethodPutProps } from '@CORTypes/http/route/methods/method-put'
import type { Optional } from '@CORTypes/optional'

import { Method } from './method'

export class MethodPut extends Method<TMethodPutProps> implements IMethodPut {
  static create(props: Optional<TMethodPutProps, 'path' | 'pathPrefix'>) {
    return new MethodPut('PUT', {
      ...props,
      path: props.path ?? '/:id',
      pathPrefix: props.pathPrefix ?? '/',
    })
  }
}
