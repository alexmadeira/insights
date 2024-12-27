import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { ITeam, TTeamProps } from '@DOMTypes/enterprise/entities/team'

import { Entity } from '_COR/entities/entity'

import { Slug } from './value-objects/slug'
import { TeamAvatarList } from './team-avatar-list'

export type * from '@DOMTypes/enterprise/entities/team'

export class Team extends Entity<TTeamProps> implements ITeam {
  static create(props: Optional<TTeamProps, 'slug' | 'avatars'>, id?: UniqueEntityID) {
    return new Team(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        avatars: props.avatars ?? new TeamAvatarList(),
      },
      id,
    )
  }

  public set avatars(avatars: TeamAvatarList) {
    this._props.avatars = avatars
  }

  public set company(company: string) {
    this._props.company = company
  }

  public set members(members: string[]) {
    this._props.members = members
  }

  public set profiles(profiles: string[]) {
    this._props.profiles = profiles
  }

  public get name() {
    return this._props.name
  }

  public set name(name: string) {
    this._props.name = name
  }

  public get avatars() {
    return this._props.avatars
  }

  public get company() {
    return this._props.company
  }

  public get members() {
    return this._props.members
  }

  public get profiles() {
    return this._props.profiles
  }

  public get slug() {
    return this._props.slug
  }
}
