import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IProfile, TProfileProps } from '@DOMTypes/enterprise/entities/profile'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { ProfileReferenceList } from './profile-reference-list'
import { Slug } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/profile'

export class Profile extends AggregateRoot<TProfileProps> implements IProfile {
  static create(props: Optional<TProfileProps, 'slug' | 'references'>, id?: UniqueEntityID) {
    return new Profile(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        references: props.references ?? new ProfileReferenceList(),
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

  public set network(network: UniqueEntityID) {
    this._props.network = network
  }

  public get references() {
    return this._props.references
  }

  public set references(references: ProfileReferenceList) {
    this._props.references = references
  }

  public get slug() {
    return this._props.slug
  }
}
