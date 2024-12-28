import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { ProfileReference } from './profile-reference'

export class ProfileReferenceList extends WatchedList<ProfileReference> {
  compareItems(a: ProfileReference, b: ProfileReference): boolean {
    return a.referenceId.equals(b.referenceId)
  }

  static create(profileId: UniqueEntityID, referencesIds: string[]) {
    return new ProfileReferenceList(
      referencesIds.map((referenceId) => {
        return ProfileReference.create({
          profileId,
          referenceId: new UniqueEntityID(referenceId),
        })
      }),
    )
  }
}
