import type { Optional } from '@CORTypes/optional'
import type { IMethodGet, TMethodGetProps } from '@INFTypes/common/routes/methods'

import { ZMethodGetProps } from '@INFTypes/common/routes/methods'

import { Method } from './method'

export class MethodGet extends Method<TMethodGetProps> implements IMethodGet {
  static create(props: Optional<Omit<TMethodGetProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodGet(ZMethodGetProps.parse(props), customKey)
  }
}
