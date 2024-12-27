import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { ICompany, TCompanyProps } from '@DOMTypes/enterprise/entities/company'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { Slug } from './value-objects/slug'
import { CompanyAvatarList } from './company-avatar-list'
import { CompanyMemberList } from './company-member-list'
import { CompanyProfileList } from './company-profile-list'
import { CompanyTeamList } from './company-team-list'

export type * from '@DOMTypes/enterprise/entities/company'

export class Company extends AggregateRoot<TCompanyProps> implements ICompany {
  static create(
    props: Optional<TCompanyProps, 'slug' | 'teams' | 'members' | 'profiles' | 'avatars'>,
    id?: UniqueEntityID,
  ) {
    return new Company(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        teams: props.teams ?? new CompanyTeamList(),
        members: props.members ?? new CompanyMemberList(),
        avatars: props.avatars ?? new CompanyAvatarList(),
        profiles: props.profiles ?? new CompanyProfileList(),
      },
      id,
    )
  }

  public set name(name: string) {
    this._props.name = name
  }

  public set avatars(avatars: CompanyAvatarList) {
    this._props.avatars = avatars
  }

  public set teams(teams: CompanyTeamList) {
    this._props.teams = teams
  }

  public set members(members: CompanyMemberList) {
    this._props.members = members
  }

  public set profiles(profiles: CompanyProfileList) {
    this._props.profiles = profiles
  }

  public get name() {
    return this._props.name
  }

  public get avatars() {
    return this._props.avatars
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

  public get slug() {
    return this._props.slug
  }
}
