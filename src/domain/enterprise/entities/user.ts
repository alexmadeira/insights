import type { Role } from './value-objects'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '_COR/types/optional'
import type { IUser, TUserProps } from '@DOMTypes/enterprise/entities/user'

import { Entity } from '_COR/entities/entity'

import { Slug } from './value-objects'

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

  public set name(name: string) {
    this._props.name = name
  }

  public get avantar() {
    return this._props.avantar
  }

  public set avantar(avantar: string | undefined) {
    this._props.avantar = avantar
  }

  public get role() {
    return this._props.role
  }

  public set role(role: Role) {
    this._props.role = role
  }

  public get email() {
    return this._props.email
  }

  public set email(email: string) {
    this._props.email = email
  }

  public get team() {
    return this._props.team
  }

  public set team(team: string) {
    this._props.team = team
  }

  public get company() {
    return this._props.company
  }

  public set company(company: string) {
    this._props.company = company
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
