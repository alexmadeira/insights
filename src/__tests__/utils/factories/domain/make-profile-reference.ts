import type { TProfileReferenceProps } from '_DOM/enterprise/entities/profile-reference'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ProfileReference } from '_DOM/enterprise/entities/profile-reference'

export function makeProfileReference(overrides: Partial<TProfileReferenceProps> = {}, id?: UniqueEntityID) {
  return ProfileReference.create(
    {
      profileId: new UniqueEntityID(),
      referenceId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
