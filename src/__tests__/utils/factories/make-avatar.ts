import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TAvatarProps } from '_DOMEnt/entities/avatar'

import { Avatar } from '_DOMEnt/entities/avatar'
import { faker } from '@faker-js/faker'

export function makeAvatar(overrides: Partial<TAvatarProps> = {}, id?: UniqueEntityID) {
  return Avatar.create(
    {
      name: faker.person.fullName(),
      url: faker.image.avatarGitHub(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
