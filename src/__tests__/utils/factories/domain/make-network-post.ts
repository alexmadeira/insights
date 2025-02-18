import type { TNetworkPostProps } from '_DOM/enterprise/entities/network-post'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { NetworkPost } from '_DOM/enterprise/entities/network-post'

export function makeNetworkPost(overrides: Partial<TNetworkPostProps> = {}, id?: UniqueEntityID) {
  return NetworkPost.create(
    {
      networkId: new UniqueEntityID(),
      postId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
