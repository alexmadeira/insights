import type { TUserProps } from '_DOMEnt/entities/user'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ROLES } from '_DOM/constants/role'
import { User } from '_DOMEnt/entities/user'
import { UserAvatar } from '_DOMEnt/entities/user-avatar'
import { UserTeamList } from '_DOMEnt/entities/user-team-list'
import { Role } from '_DOMEnt/entities/value-objects'
import { faker } from '@faker-js/faker'

export function makeUser(overrides: Partial<TUserProps> = {}, id?: UniqueEntityID) {
  const name = faker.person.fullName()
  return User.create(
    {
      name,
      email: faker.internet.email(),
      company: new UniqueEntityID(),
      teams: new UserTeamList(),
      role: Role.create(faker.helpers.arrayElement(ROLES)),
      avatar: UserAvatar.create({ name }),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
