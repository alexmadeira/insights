import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IMemberTeam, TMemberTeamProps } from '@DOMTypes/enterprise/entities/member-team'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/member-team'

export class MemberTeam extends Entity<TMemberTeamProps> implements IMemberTeam {
  static create(props: TMemberTeamProps, id?: UniqueEntityID) {
    return new MemberTeam(props, id)
  }

  public get memberId() {
    return this._props.memberId
  }

  public get teamId() {
    return this._props.teamId
  }
}
