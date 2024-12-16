import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TPostProps } from '_DOMEnt/entities/post'

import { Post } from '_DOMEnt/entities/post'
import { faker } from '@faker-js/faker'

export function makePost(overrides: Partial<TPostProps> = {}, id?: UniqueEntityID) {
  return Post.create(
    {
      title: faker.lorem.sentence(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
