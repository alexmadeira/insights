import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IUser, TUserProps } from '@DOMTypes/enterprise/entities/user'

import { Entity } from '_COR/entities/entity'
import { Optional } from '_COR/types/optional'

import { Slug } from './value-objects/slug'

export type * from '@DOMTypes/enterprise/entities/user'

export class User extends Entity<TUserProps> implements IUser {
  static create({ slug, createdAt, ...rest }: Optional<TUserProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
    return new User(
      {
        ...rest,
        slug: slug ?? Slug.createFromText(rest.name),
        createdAt: createdAt ?? new Date(),
      },
      id,
    )
  }

  public get name() {
    return this._props.name
  }

  public get avantar() {
    return this._props.avantar
  }

  public get role() {
    return this._props.role
  }

  public get email() {
    return this._props.email
  }

  public get team() {
    return this._props.team
  }

  public get company() {
    return this._props.company
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
