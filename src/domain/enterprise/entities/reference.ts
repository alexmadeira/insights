import type { ReferenceStatus } from './value-objects'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IReference, TReferenceProps } from '@DOMTypes/enterprise/entities/reference'

import { Entity } from '_COR/entities/entity'

import { Slug } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/reference'

export class Reference extends Entity<TReferenceProps> implements IReference {
  static create(props: Optional<TReferenceProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
    return new Reference(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  public get name() {
    return this._props.name
  }

  public set name(name: string) {
    this._props.name = name
  }

  public get status() {
    return this._props.status
  }

  public set status(status: ReferenceStatus) {
    this._props.status = status
  }

  public get network() {
    return this._props.network
  }

  public set network(network: string) {
    this._props.network = network
  }

  public get slug() {
    return this._props.slug
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
