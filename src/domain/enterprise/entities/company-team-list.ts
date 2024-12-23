import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { CompanyTeam } from './company-team'

export class CompanyTeamList extends WatchedList<CompanyTeam> {
  compareItems(a: CompanyTeam, b: CompanyTeam): boolean {
    return a.teamId.equals(b.teamId)
  }

  static create(companyId: UniqueEntityID, teamsIds: string[]) {
    return new CompanyTeamList(
      teamsIds.map((teamId) => {
        return CompanyTeam.create({
          companyId,
          teamId: new UniqueEntityID(teamId),
        })
      }),
    )
  }
}
