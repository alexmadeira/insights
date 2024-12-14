import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TProfileProps } from '_DOMEnt/entities/profile'

import { Profile } from '_DOMEnt/entities/profile'
import { Slug } from '_DOMEnt/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeProfile(overrides: Partial<TProfileProps> = {}, id?: UniqueEntityID) {
  const profileName = faker.person.fullName()

  return Profile.create(
    {
      name: profileName,
      slug: new Slug(profileName),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
