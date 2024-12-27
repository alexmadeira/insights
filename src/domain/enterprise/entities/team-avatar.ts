import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ITeamAvatar, TTeamAvatarProps } from '@DOMTypes/enterprise/entities/team-avatar'

import { Avatar } from './avatar'

export type * from '@DOMTypes/enterprise/entities/team-avatar'

export class TeamAvatar extends Avatar implements ITeamAvatar {
  static create(props: TTeamAvatarProps, id?: UniqueEntityID) {
    return new TeamAvatar(props, id)
  }

  public get teamId() {
    return this._props.teamId
  }

  public set teamId(teamId: UniqueEntityID | undefined) {
    this._props.teamId = teamId
  }
}
