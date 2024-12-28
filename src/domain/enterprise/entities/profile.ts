import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IProfile, TProfileProps } from '@DOMTypes/enterprise/entities/profile'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { Slug } from './value-objects/slug'

export type * from '@DOMTypes/enterprise/entities/profile'

export class Profile extends AggregateRoot<TProfileProps> implements IProfile {
  static create(props: Optional<TProfileProps, 'slug'>, id?: UniqueEntityID) {
    return new Profile(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
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

  public get network() {
    return this._props.network
  }

  public set network(network: string) {
    this._props.network = network
  }

  public get references() {
    return this._props.references
  }

  public set references(references: string[]) {
    this._props.references = references
  }

  public get slug() {
    return this._props.slug
  }
}
