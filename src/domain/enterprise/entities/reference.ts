import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IReference, TReferenceProps } from '@DOMTypes/enterprise/entities/reference'

import { Entity } from '_COR/entities/entity'
import { Optional } from '_COR/types/optional'

export type * from '@DOMTypes/enterprise/entities/reference'

export class Reference extends Entity<TReferenceProps> implements IReference {
  static create({ createdAt, ...rest }: Optional<TReferenceProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Reference(
      {
        ...rest,
        createdAt: createdAt ?? new Date(),
      },
      id,
    )
  }

  public get name() {
    return this._props.name
  }

  public get slug() {
    return this._props.slug
  }

  public get status() {
    return this._props.status
  }

  public get network() {
    return this._props.network
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
