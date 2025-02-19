import type { TAvatarProps } from '_DOM/enterprise/entities/avatar'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Avatar } from '_DOM/enterprise/entities/avatar'
import { faker } from '@faker-js/faker'

export function makeAvatar(overrides: Partial<TAvatarProps> = {}, id?: UniqueEntityID) {
  return Avatar.create(
    {
      name: faker.person.fullName(),
      url: faker.image.urlPicsumPhotos(),
      ...overrides,
    },
    id,
  )
}
