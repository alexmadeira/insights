import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IProfile, TProfileProps } from '@DOMTypes/enterprise/entities/profile'

import { Entity } from '_COR/entities/entity'
import { Optional } from '_COR/types/optional'

import { Slug } from './value-objects/slug'

export type * from '@DOMTypes/enterprise/entities/profile'

export class Profile extends Entity<TProfileProps> implements IProfile {
  static create({ slug, createdAt, ...rest }: Optional<TProfileProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
    return new Profile(
      {
        ...rest,
        slug: slug ?? Slug.createFromText(rest.name),
        createdAt: createdAt ?? new Date(),
      },
      id,
    )
  }

  public get slug() {
    return this._props.slug
  }

  public get name() {
    return this._props.name
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
