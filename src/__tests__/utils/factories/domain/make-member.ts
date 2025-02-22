import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TMemberProps } from '_DOM/enterprise/entities/member'

import { Member } from '_DOM/enterprise/entities/member'
import { MemberAvatarList } from '_DOM/enterprise/entities/member-avatar-list'
import { MemberCompanyList } from '_DOM/enterprise/entities/member-company-list'
import { MemberTeamList } from '_DOM/enterprise/entities/member-team-list'
import { faker } from '@faker-js/faker'

export function makeMember(overrides: Partial<TMemberProps> = {}, id?: UniqueEntityID) {
  const name = faker.person.fullName()
  return Member.create(
    {
      name,
      email: faker.internet.email(),
      teams: new MemberTeamList(),
      companies: new MemberCompanyList(),
      avatars: new MemberAvatarList(),
      ...overrides,
    },
    id,
  )
}
