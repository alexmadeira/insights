import type { IMethodPost, TMethodPostProps } from '@CORTypes/http/route/methods/method-post'
import type { Optional } from '@CORTypes/optional'

import { Method } from './method'

export class MethodPost extends Method<TMethodPostProps> implements IMethodPost {
  static create(props: Optional<TMethodPostProps, 'path' | 'pathPrefix'>) {
    return new MethodPost('POST', {
      ...props,
      path: props.path ?? '',
      pathPrefix: props.pathPrefix ?? '/',
    })
  }
}
