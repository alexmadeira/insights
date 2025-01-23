import type { Optional } from '@CORTypes/optional'
import type { IMethodPost, TMethodPostProps } from '@INFTypes/common/routes/methods'

import { ZMethodPostProps } from '@INFTypes/common/routes/methods'

import { Method } from './method'

export class MethodPost extends Method<TMethodPostProps> implements IMethodPost {
  static create(props: Optional<Omit<TMethodPostProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodPost(ZMethodPostProps.parse(props), customKey)
  }
}
