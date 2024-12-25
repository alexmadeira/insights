import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { ICompany, TCompanyProps } from '@DOMTypes/enterprise/entities/company'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { Slug } from './value-objects/slug'
import { CompanyMemberList } from './company-member-list'
import { CompanyTeamList } from './company-team-list'

export type * from '@DOMTypes/enterprise/entities/company'

export class Company extends AggregateRoot<TCompanyProps> implements ICompany {
  static create(props: Optional<TCompanyProps, 'createdAt' | 'slug' | 'teams' | 'members'>, id?: UniqueEntityID) {
    return new Company(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        teams: props.teams ?? new CompanyTeamList(),
        members: props.members ?? new CompanyMemberList(),
        createdAt: props.createdAt ?? new Date(),
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

  public get teams() {
    return this._props.teams
  }

  public set teams(teams: CompanyTeamList) {
    this._props.teams = teams
  }

  public get members() {
    return this._props.members
  }

  public set members(members: CompanyMemberList) {
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
