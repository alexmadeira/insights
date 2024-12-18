import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IUserTeam, TUserTeamProps } from '@DOMTypes/enterprise/entities/user-team'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/user-team'

export class UserTeam extends Entity<TUserTeamProps> implements IUserTeam {
  static create(props: TUserTeamProps, id?: UniqueEntityID) {
    return new UserTeam(props, id)
  }

  public get userId() {
    return this._props.userId
  }

  public get teamId() {
    return this._props.teamId
  }
}
