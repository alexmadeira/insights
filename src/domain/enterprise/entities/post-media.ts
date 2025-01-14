import type { IPostMedia, TPostMediaProps } from '@DOMTypes/enterprise/entities/post-media'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/post-media'

export class PostMedia extends Entity<TPostMediaProps> implements IPostMedia {
  static create(props: TPostMediaProps, id?: UniqueEntityID) {
    return new PostMedia(props, id)
  }

  public get postId() {
    return this._props.postId
  }

  public get mediaId() {
    return this._props.mediaId
  }
}
