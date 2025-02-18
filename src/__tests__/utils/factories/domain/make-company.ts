import type { TCompanyProps } from '_DOM/enterprise/entities/company'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Company } from '_DOM/enterprise/entities/company'
import { CompanyAvatarList } from '_DOM/enterprise/entities/company-avatar-list'
import { CompanyMemberList } from '_DOM/enterprise/entities/company-member-list'
import { CompanyProfileList } from '_DOM/enterprise/entities/company-profile-list'
import { CompanyTeamList } from '_DOM/enterprise/entities/company-team-list'
import { faker } from '@faker-js/faker'

export function makeCompany(overrides: Partial<TCompanyProps> = {}, id?: UniqueEntityID) {
  const name = faker.company.name()

  return Company.create(
    {
      name,
      members: new CompanyMemberList(),
      teams: new CompanyTeamList(),
      profiles: new CompanyProfileList(),
      avatars: new CompanyAvatarList(),
      ...overrides,
    },
    id,
  )
}
