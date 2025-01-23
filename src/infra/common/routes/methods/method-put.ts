import type { Optional } from '@CORTypes/optional'
import type { IMethodPut, TMethodPutProps } from '@INFTypes/common/routes/methods'

import { ZMethodPutProps } from '@INFTypes/common/routes/methods'

import { Method } from './method'

export class MethodPut extends Method<TMethodPutProps> implements IMethodPut {
  static create(props: Optional<Omit<TMethodPutProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodPut(ZMethodPutProps.parse(props), customKey)
  }
}
