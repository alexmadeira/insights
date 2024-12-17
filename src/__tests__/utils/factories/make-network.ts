import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TNetworkProps } from '_DOMEnt/entities/network'

import { randomUUID } from 'node:crypto'

import { Network } from '_DOMEnt/entities/network'
import { faker } from '@faker-js/faker'

export function makeNetwork(overrides: Partial<TNetworkProps> = {}, id?: UniqueEntityID) {
  return Network.create(
    {
      name: faker.person.firstName(),
      username: faker.internet.username(),
      type: 'instagram',
      posts: [randomUUID()],
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
