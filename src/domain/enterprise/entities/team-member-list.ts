import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { TeamMember } from './team-member'

export class TeamMemberList extends WatchedList<TeamMember> {
  compareItems(a: TeamMember, b: TeamMember): boolean {
    return a.memberId.equals(b.memberId)
  }

  static create(teamId: UniqueEntityID, membersIds: string[]) {
    return new TeamMemberList(
      membersIds.map((memberId) => {
        return TeamMember.create({
          teamId,
          memberId: new UniqueEntityID(memberId),
        })
      }),
    )
  }
}
