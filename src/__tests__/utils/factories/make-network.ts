import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TNetworkProps } from '_DOMEnt/entities/network'

import { Network } from '_DOMEnt/entities/network'
import { NetworkPostList } from '_DOMEnt/entities/network-post-list'
import { faker } from '@faker-js/faker'

export function makeNetwork(overrides: Partial<TNetworkProps> = {}, id?: UniqueEntityID) {
  return Network.create(
    {
      name: faker.person.firstName(),
      username: faker.internet.username(),
      type: 'instagram',
      posts: new NetworkPostList(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
