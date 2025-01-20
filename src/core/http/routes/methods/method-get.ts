import type { IMethodGet, TMethodGetProps } from '@CORTypes/http/route/methods/method-get'
import type { Optional } from '@CORTypes/optional'

import { Method } from './method'

export class MethodGet extends Method<TMethodGetProps> implements IMethodGet {
  static create(props: Optional<TMethodGetProps, 'path' | 'pathPrefix'>) {
    return new MethodGet('GET', {
      ...props,
      path: props.path ?? '/:id',
      pathPrefix: props.pathPrefix ?? '/',
    })
  }
}
