import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { TeamAvatar } from './team-avatar'

export class TeamAvatarList extends WatchedList<TeamAvatar> {
  compareItems(a: TeamAvatar, b: TeamAvatar): boolean {
    return a.avatarId.equals(b.avatarId)
  }

  static create(teamId: UniqueEntityID, avatarsIds: string[]) {
    return new TeamAvatarList(
      avatarsIds.map((avatarId) => {
        return TeamAvatar.create({
          teamId,
          avatarId: new UniqueEntityID(avatarId),
        })
      }),
    )
  }
}
