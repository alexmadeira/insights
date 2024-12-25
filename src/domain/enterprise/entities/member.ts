import type { Role } from './value-objects'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IMember, TMemberProps } from '@DOMTypes/enterprise/entities/member'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { MemberCompanyList } from './member-company-list'
import { MemberTeamList } from './member-team-list'
import { Slug } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/member'

export class Member extends AggregateRoot<TMemberProps> implements IMember {
  static create(props: Optional<TMemberProps, 'createdAt' | 'slug' | 'teams' | 'companies'>, id?: UniqueEntityID) {
    const member = new Member(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        teams: props.teams ?? new MemberTeamList(),
        companies: props.companies ?? new MemberCompanyList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return member
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

  public set teams(teams: MemberTeamList) {
    this._props.teams = teams
  }

  public get companies() {
    return this._props.companies
  }

  public set companies(companies: MemberCompanyList) {
    this._props.companies = companies
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
