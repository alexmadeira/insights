import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { ITeamAvatar, TTeamAvatarProps } from '@DOMTypes/enterprise/entities/team-avatar'

import { Optional } from '@CORTypes/optional'

import { Avatar } from './avatar'

export type * from '@DOMTypes/enterprise/entities/team-avatar'

export class TeamAvatar extends Avatar<TTeamAvatarProps> implements ITeamAvatar {
  static create({ createdAt, ...rest }: Optional<TTeamAvatarProps, 'createdAt'>, id?: UniqueEntityID) {
    return new TeamAvatar(
      {
        createdAt: createdAt ?? new Date(),
        ...rest,
      },
      id,
    )
  }

  public get teamId() {
    return this._props.teamId
  }

  public set teamId(teamId: UniqueEntityID | undefined) {
    this._props.teamId = teamId
  }
}
