import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TMemberProps } from '_DOMEnt/entities/member'

import { ROLES } from '_DOM/constants/role'
import { Member } from '_DOMEnt/entities/member'
import { MemberAvatar } from '_DOMEnt/entities/member-avatar'
import { MemberCompanyList } from '_DOMEnt/entities/member-company-list'
import { MemberTeamList } from '_DOMEnt/entities/member-team-list'
import { Role } from '_DOMEnt/entities/value-objects'
import { faker } from '@faker-js/faker'

export function makeMember(overrides: Partial<TMemberProps> = {}, id?: UniqueEntityID) {
  const name = faker.person.fullName()
  return Member.create(
    {
      name,
      email: faker.internet.email(),
      teams: new MemberTeamList(),
      companies: new MemberCompanyList(),
      role: Role.create(faker.helpers.arrayElement(ROLES)),
      avatar: MemberAvatar.create({ name }),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
