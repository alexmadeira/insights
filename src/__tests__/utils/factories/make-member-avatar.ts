import type { TMemberAvatarProps } from '_DOMEnt/entities/member-avatar'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { MemberAvatar } from '_DOMEnt/entities/member-avatar'
import { faker } from '@faker-js/faker'

export function makeMemberAvatar(overrides: Partial<TMemberAvatarProps> = {}, id?: UniqueEntityID) {
  return MemberAvatar.create(
    {
      memberId: new UniqueEntityID(),
      name: faker.person.fullName(),
      url: faker.image.avatarGitHub(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}