import type { Role } from './value-objects'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IUser, TUserProps } from '@DOMTypes/enterprise/entities/user'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { UserAvatar } from './user-avatar'
import { UserTeamList } from './user-team-list'
import { Slug } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/user'

export class User extends AggregateRoot<TUserProps> implements IUser {
  static create(props: Optional<TUserProps, 'createdAt' | 'slug' | 'teams'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        teams: props.teams || new UserTeamList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }

  public get name() {
    return this._props.name
  }

  public set name(name: string) {
    this._props.name = name
  }

  public get avantar() {
    if (this._props.avantar) return this._props.avantar

    return UserAvatar.create({
      name: this.name,
      userId: this.id,
    })
  }

  public set avantar(avantar: UserAvatar) {
    this._props.avantar = avantar
  }

  public removeAvantar() {
    this._props.avantar = undefined
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

  public get teams() {
    return this._props.teams
  }

  public set teams(teams: UserTeamList) {
    this._props.teams = teams
  }

  public get company() {
    return this._props.company
  }

  public set company(company: UniqueEntityID) {
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
