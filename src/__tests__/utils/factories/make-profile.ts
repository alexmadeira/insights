import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TProfileProps } from '_DOMEnt/entities/profile'

import { randomUUID } from 'node:crypto'

import { Profile } from '_DOMEnt/entities/profile'
import { faker } from '@faker-js/faker'

export function makeProfile(overrides: Partial<TProfileProps> = {}, id?: UniqueEntityID) {
  return Profile.create(
    {
      name: faker.person.firstName(),
      network: randomUUID(),
      references: [randomUUID()],
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
