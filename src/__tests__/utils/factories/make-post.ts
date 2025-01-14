import type { TPostProps } from '_DOMEnt/entities/post'

import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { POST_STATUS } from '_DOM/constants/post'
import { Post } from '_DOMEnt/entities/post'
import { PostMediaList } from '_DOMEnt/entities/post-media-list'
import { PostStatus } from '_DOMEnt/entities/value-objects'

export function makePost(overrides: Partial<TPostProps> = {}, id?: UniqueEntityID) {
  return Post.create(
    {
      cover: faker.image.url(),
      likes: faker.number.int(),
      deslikes: faker.number.int(),
      comments: faker.number.int(),
      title: faker.lorem.sentence(),
      scheduledDate: faker.date.soon(),
      description: faker.lorem.paragraphs(),
      medias: new PostMediaList(),
      network: new UniqueEntityID(),
      status: new PostStatus(faker.helpers.arrayElement(POST_STATUS)),
      ...overrides,
    },
    id,
  )
}
