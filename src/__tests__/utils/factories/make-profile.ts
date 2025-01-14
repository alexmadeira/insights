import type { TProfileProps } from '_DOMEnt/entities/profile'

import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Profile } from '_DOMEnt/entities/profile'
import { ProfileReferenceList } from '_DOMEnt/entities/profile-reference-list'

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
