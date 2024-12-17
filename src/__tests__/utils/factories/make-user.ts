import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TUserProps } from '_DOMEnt/entities/user'

import { randomUUID } from 'node:crypto'

import { ROLES } from '_DOM/constants/role'
import { User } from '_DOMEnt/entities/user'
import { Role } from '_DOMEnt/entities/value-objects'
import { faker } from '@faker-js/faker'

export function makeUser(overrides: Partial<TUserProps> = {}, id?: UniqueEntityID) {
  return User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      team: randomUUID(),
      company: randomUUID(),
      role: Role.create(faker.helpers.arrayElement(ROLES)),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
