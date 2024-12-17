import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '_COR/types/optional'
import type { ICompany, TCompanyProps } from '@DOMTypes/enterprise/entities/company'

import { Entity } from '_COR/entities/entity'

import { Slug } from './value-objects/slug'

export type * from '@DOMTypes/enterprise/entities/company'

export class Company extends Entity<TCompanyProps> implements ICompany {
  static create({ slug, createdAt, ...rest }: Optional<TCompanyProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
    return new Company(
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

  public get slug() {
    return this._props.slug
  }

  public get owner() {
    return this._props.owner
  }

  public get teams() {
    return this._props.teams
  }

  public get members() {
    return this._props.members
  }

  public get profiles() {
    return this._props.profiles
  }

  public get createdAt() {
    return this._props.createdAt
  }

  public get updatedAt() {
    return this._props.updatedAt
  }
}
