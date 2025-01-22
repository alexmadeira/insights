import type { IMethodPut, TMethodPutProps } from '@CORTypes/http/route/methods/method-put'
import type { Optional } from '@CORTypes/optional'

import { ZMethodPutProps } from '@CORTypes/http/route/methods/method-put'

import { Method } from './method'

export class MethodPut extends Method<TMethodPutProps> implements IMethodPut {
  static create(props: Optional<Omit<TMethodPutProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodPut(ZMethodPutProps.parse(props), customKey)
  }
}
