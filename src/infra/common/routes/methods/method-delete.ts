import type { Optional } from '@CORTypes/optional'
import type { IMethodDelete, TMethodDeleteProps } from '@INFTypes/common/routes/methods'

import { ZMethodDeleteProps } from '@INFTypes/common/routes/methods'

import { Method } from './method'

export class MethodDelete extends Method<TMethodDeleteProps> implements IMethodDelete {
  static create(props: Optional<Omit<TMethodDeleteProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodDelete(ZMethodDeleteProps.parse(props), customKey)
  }
}
