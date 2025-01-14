import type { ITeamAvatar, TTeamAvatarProps } from '@DOMTypes/enterprise/entities/team-avatar'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/team-avatar'

export class TeamAvatar extends Entity<TTeamAvatarProps> implements ITeamAvatar {
  static create(props: TTeamAvatarProps, id?: UniqueEntityID) {
    return new TeamAvatar(props, id)
  }

  public get teamId() {
    return this._props.teamId
  }

  public get avatarId() {
    return this._props.avatarId
  }
}
