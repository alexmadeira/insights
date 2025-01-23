import type { Optional } from '@CORTypes/optional'
import type { IMethodPatch, TMethodPatchProps } from '@INFTypes/common/routes/methods'

import { ZMethodPatchProps } from '@INFTypes/common/routes/methods'

import { Method } from './method'

export class MethodPatch extends Method<TMethodPatchProps> implements IMethodPatch {
  static create(props: Optional<Omit<TMethodPatchProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodPatch(ZMethodPatchProps.parse(props), customKey)
  }
}
