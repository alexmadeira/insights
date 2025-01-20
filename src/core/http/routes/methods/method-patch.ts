import type { IMethodPatch, TMethodPatchProps } from '@CORTypes/http/route/methods/method-patch'
import type { Optional } from '@CORTypes/optional'

import { Method } from './method'

export class MethodPatch extends Method<TMethodPatchProps> implements IMethodPatch {
  static create(props: Optional<TMethodPatchProps, 'path' | 'pathPrefix'>) {
    return new MethodPatch('PATCH', {
      ...props,
      path: props.path ?? '/:id',
      pathPrefix: props.pathPrefix ?? '/',
    })
  }
}
