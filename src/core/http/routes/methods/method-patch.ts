import type { IMethodPatch, TMethodPatchProps } from '@CORTypes/http/route/methods/method-patch'
import type { Optional } from '@CORTypes/optional'

import { ZMethodPatchProps } from '@CORTypes/http/route/methods/method-patch'

import { Method } from './method'

export class MethodPatch extends Method<TMethodPatchProps> implements IMethodPatch {
  static create(props: Optional<Omit<TMethodPatchProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodPatch(ZMethodPatchProps.parse(props), customKey)
  }
}
