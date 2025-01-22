import type { IMethodDelete, TMethodDeleteProps } from '@CORTypes/http/route/methods/method-delete'
import type { Optional } from '@CORTypes/optional'

import { ZMethodDeleteProps } from '@CORTypes/http/route/methods/method-delete'

import { Method } from './method'

export class MethodDelete extends Method<TMethodDeleteProps> implements IMethodDelete {
  static create(props: Optional<Omit<TMethodDeleteProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodDelete(ZMethodDeleteProps.parse(props), customKey)
  }
}
