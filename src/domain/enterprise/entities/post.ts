import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IPost, TPostProps } from '@DOMTypes/enterprise/entities/post'

import { Entity } from '_COR/entities/entity'
import { Optional } from '_COR/types/optional'

export type * from '@DOMTypes/enterprise/entities/post'

export class Post extends Entity<TPostProps> implements IPost {
  static create({ createdAt, ...rest }: Optional<TPostProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Post(
      {
        ...rest,
        createdAt: createdAt ?? new Date(),
      },
      id,
    )
  }

  public get title() {
    return this._props.title
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
