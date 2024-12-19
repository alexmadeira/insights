import type { TUserAvatarProps } from '_DOMEnt/entities/user-avatar'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { UserAvatar } from '_DOMEnt/entities/user-avatar'
import { faker } from '@faker-js/faker'

export function makeUserAvatar(overrides: Partial<TUserAvatarProps> = {}, id?: UniqueEntityID) {
  return UserAvatar.create(
    {
      userId: new UniqueEntityID(),
      name: faker.person.fullName(),
      url: faker.image.avatarGitHub(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
