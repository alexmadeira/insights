import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IMember, TMemberProps } from '@DOMTypes/enterprise/entities/member'

import { AggregateRoot } from '_COR/entities/aggregate-root'

import { MemberAvatarList } from './member-avatar-list'
import { MemberCompanyList } from './member-company-list'
import { MemberTeamList } from './member-team-list'
import { Slug } from './value-objects'

export type * from '@DOMTypes/enterprise/entities/member'

export class Member extends AggregateRoot<TMemberProps> implements IMember {
  static create(props: Optional<TMemberProps, 'slug' | 'teams' | 'companies' | 'avatars'>, id?: UniqueEntityID) {
    const member = new Member(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        teams: props.teams ?? new MemberTeamList(),
        avatars: props.avatars ?? new MemberAvatarList(),
        companies: props.companies ?? new MemberCompanyList(),
      },
      id,
    )

    return member
  }

  public set name(name: string) {
    this._props.name = name
  }

  public set avatars(avatars: MemberAvatarList) {
    this._props.avatars = avatars
  }

  public set email(email: string) {
    this._props.email = email
  }

  public set teams(teams: MemberTeamList) {
    this._props.teams = teams
  }

  public set companies(companies: MemberCompanyList) {
    this._props.companies = companies
  }

  public get name() {
    return this._props.name
  }

  public get avatars() {
    return this._props.avatars
  }

  public get email() {
    return this._props.email
  }

  public get teams() {
    return this._props.teams
  }

  public get companies() {
    return this._props.companies
  }

  public get slug() {
    return this._props.slug
  }
}
