import type { TeamAvatar } from './team-avatar'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { ITeam, TTeamProps } from '@DOMTypes/enterprise/entities/team'

import { Entity } from '_COR/entities/entity'

import { Slug } from './value-objects/slug'

export type * from '@DOMTypes/enterprise/entities/team'

export class Team extends Entity<TTeamProps> implements ITeam {
  static create({ slug, createdAt, ...rest }: Optional<TTeamProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
    return new Team(
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
    this._props.avatar.name = name
  }

  public get avatar() {
    return this._props.avatar
  }

  public set avatar(avatar: TeamAvatar) {
    this._props.avatar = avatar
  }

  public get company() {
    return this._props.company
  }

  public set company(company: string) {
    this._props.company = company
  }

  public get members() {
    return this._props.members
  }

  public set members(members: string[]) {
    this._props.members = members
  }

  public get profiles() {
    return this._props.profiles
  }

  public set profiles(profiles: string[]) {
    this._props.profiles = profiles
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
