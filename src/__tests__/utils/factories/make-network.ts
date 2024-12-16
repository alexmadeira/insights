import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TNetworkProps } from '_DOMEnt/entities/network'

import { NETWORK_STATUS } from '_DOM/constants/network'
import { Network } from '_DOMEnt/entities/network'
import { NetworkStatus } from '_DOMEnt/entities/value-objects/network-status'
import { faker } from '@faker-js/faker'

export function makeNetwork(overrides: Partial<TNetworkProps> = {}, id?: UniqueEntityID) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return Network.create(
    {
      name: `${firstName} ${lastName}`,
      userName: faker.internet.username({
        firstName,
        lastName,
      }),
      status: NetworkStatus.create(faker.helpers.arrayElement(NETWORK_STATUS)),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
