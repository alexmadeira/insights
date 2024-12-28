import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { TeamProfile } from './team-profile'

export class TeamProfileList extends WatchedList<TeamProfile> {
  compareItems(a: TeamProfile, b: TeamProfile): boolean {
    return a.profileId.equals(b.profileId)
  }

  static create(teamId: UniqueEntityID, profilesIds: string[]) {
    return new TeamProfileList(
      profilesIds.map((profileId) => {
        return TeamProfile.create({
          teamId,
          profileId: new UniqueEntityID(profileId),
        })
      }),
    )
  }
}
