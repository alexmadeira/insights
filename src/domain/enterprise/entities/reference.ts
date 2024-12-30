import type { ReferenceStatus } from './value-objects'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IReference, TReferenceProps } from '@DOMTypes/enterprise/entities/reference'

import { Entity } from '_COR/entities/entity'

import { Slug } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/reference'

export class Reference extends Entity<TReferenceProps> implements IReference {
  static create(props: Optional<TReferenceProps, 'slug'>, id?: UniqueEntityID) {
    return new Reference(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
      },
      id,
    )
  }

  public set name(name: string) {
    this._props.name = name
  }

  public set status(status: ReferenceStatus) {
    this._props.status = status
  }

  public set network(network: UniqueEntityID) {
    this._props.network = network
  }

  public get name() {
    return this._props.name
  }

  public get status() {
    return this._props.status
  }

  public get network() {
    return this._props.network
  }

  public get slug() {
    return this._props.slug
  }
}
