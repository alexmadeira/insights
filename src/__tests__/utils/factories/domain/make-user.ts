import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TUserProps } from '_DOMEnt/entities/user'

import { User } from '_DOMEnt/entities/user'
import { faker } from '@faker-js/faker'

export function makeUser(overrides: Partial<TUserProps> = {}, id?: UniqueEntityID) {
  return User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      hash: faker.internet.password(),
      indetifier: faker.internet.username(),
      ...overrides,
    },
    id,
  )
}
