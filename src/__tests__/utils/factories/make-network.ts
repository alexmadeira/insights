import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TNetworkProps } from '_DOMEnt/entities/network'

import { NETWORK_TYPES } from '_DOM/constants/network'
import { Network } from '_DOMEnt/entities/network'
import { NetworkPostList } from '_DOMEnt/entities/network-post-list'
import { NetworkType } from '_DOMEnt/entities/value-objects/network-type'
import { faker } from '@faker-js/faker'

export function makeNetwork(overrides: Partial<TNetworkProps> = {}, id?: UniqueEntityID) {
  return Network.create(
    {
      name: faker.person.firstName(),
      username: faker.internet.username(),
      avatar: faker.image.avatarGitHub(),
      type: new NetworkType(faker.helpers.arrayElement(NETWORK_TYPES)),
      posts: new NetworkPostList(),
      ...overrides,
    },
    id,
  )
}
