import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { CompanyProfile } from './company-profile'

export class CompanyProfileList extends WatchedList<CompanyProfile> {
  compareItems(a: CompanyProfile, b: CompanyProfile): boolean {
    return a.profileId.equals(b.profileId)
  }

  static create(companyId: UniqueEntityID, profilesIds: string[]) {
    return new CompanyProfileList(
      profilesIds.map((profileId) => {
        return CompanyProfile.create({
          companyId,
          profileId: new UniqueEntityID(profileId),
        })
      }),
    )
  }
}
