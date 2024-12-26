import type { TCompanyProps } from '_DOMEnt/entities/company'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatar } from '_DOMEnt/entities/company-avatar'
import { CompanyMemberList } from '_DOMEnt/entities/company-member-list'
import { CompanyProfileList } from '_DOMEnt/entities/company-profile-list'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'
import { faker } from '@faker-js/faker'

export function makeCompany(overrides: Partial<TCompanyProps> = {}, id?: UniqueEntityID) {
  const name = faker.company.name()

  return Company.create(
    {
      name,
      members: new CompanyMemberList(),
      teams: new CompanyTeamList(),
      profiles: new CompanyProfileList(),
      avatar: CompanyAvatar.create({ name }),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
