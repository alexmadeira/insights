import type { IMethodGet, TMethodGetProps } from '@CORTypes/http/route/methods/method-get'
import type { Optional } from '@CORTypes/optional'

import { ZMethodGetProps } from '@CORTypes/http/route/methods/method-get'

import { Method } from './method'

export class MethodGet extends Method<TMethodGetProps> implements IMethodGet {
  static create(props: Optional<Omit<TMethodGetProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodGet(ZMethodGetProps.parse(props), customKey)
  }
}
