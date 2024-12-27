import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ITeamMember, TTeamMemberProps } from '@DOMTypes/enterprise/entities/team-member'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/team-member'

export class TeamMember extends Entity<TTeamMemberProps> implements ITeamMember {
  static create(props: TTeamMemberProps, id?: UniqueEntityID) {
    return new TeamMember(props, id)
  }

  public get teamId() {
    return this._props.teamId
  }

  public get memberId() {
    return this._props.memberId
  }
}
