import type { TProfileProps } from '_DOM/enterprise/entities/profile'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Profile } from '_DOM/enterprise/entities/profile'
import { ProfileReferenceList } from '_DOM/enterprise/entities/profile-reference-list'
import { faker } from '@faker-js/faker'

export function makeProfile(overrides: Partial<TProfileProps> = {}, id?: UniqueEntityID) {
  return Profile.create(
    {
      name: faker.person.firstName(),
      network: new UniqueEntityID(),
      references: new ProfileReferenceList(),
      ...overrides,
    },
    id,
  )
}
