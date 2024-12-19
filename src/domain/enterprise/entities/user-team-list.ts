import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { UserTeam } from './user-team'

export class UserTeamList extends WatchedList<UserTeam> {
  compareItems(a: UserTeam, b: UserTeam): boolean {
    return a.teamId.equals(b.teamId)
  }

  static create(userId: UniqueEntityID, teamsIds: string[]) {
    return new UserTeamList(
      teamsIds.map((teamId) => {
        return UserTeam.create({
          userId,
          teamId: new UniqueEntityID(teamId),
        })
      }),
    )
  }
}
