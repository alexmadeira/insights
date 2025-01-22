import type { IMethodPost, TMethodPostProps } from '@CORTypes/http/route/methods/method-post'
import type { Optional } from '@CORTypes/optional'

import { ZMethodPostProps } from '@CORTypes/http/route/methods/method-post'

import { Method } from './method'

export class MethodPost extends Method<TMethodPostProps> implements IMethodPost {
  static create(props: Optional<Omit<TMethodPostProps, 'type'>, 'path' | 'pathPrefix'>, customKey?: string) {
    return new MethodPost(ZMethodPostProps.parse(props), customKey)
  }
}
