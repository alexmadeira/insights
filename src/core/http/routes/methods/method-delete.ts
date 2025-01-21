import type { IMethodDelete, TMethodDeleteProps } from '@CORTypes/http/route/methods/method-delete'
import type { Optional } from '@CORTypes/optional'

import { Method } from './method'

export class MethodDelete extends Method<TMethodDeleteProps> implements IMethodDelete {
  static create(props: Optional<TMethodDeleteProps, 'path' | 'pathPrefix'>) {
    return new MethodDelete('DELETE', {
      ...props,
      path: props.path ?? '/:id',
      pathPrefix: props.pathPrefix ?? '/',
    })
  }
}
