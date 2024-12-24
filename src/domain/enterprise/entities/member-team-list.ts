import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { MemberTeam } from './member-team'

export class MemberTeamList extends WatchedList<MemberTeam> {
  compareItems(a: MemberTeam, b: MemberTeam): boolean {
    return a.teamId.equals(b.teamId)
  }

  static create(memberId: UniqueEntityID, teamsIds: string[]) {
    return new MemberTeamList(
      teamsIds.map((teamId) => {
        return MemberTeam.create({
          memberId,
          teamId: new UniqueEntityID(teamId),
        })
      }),
    )
  }
}
