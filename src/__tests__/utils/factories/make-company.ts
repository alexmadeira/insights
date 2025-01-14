import type { TCompanyProps } from '_DOMEnt/entities/company'

import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatarList } from '_DOMEnt/entities/company-avatar-list'
import { CompanyMemberList } from '_DOMEnt/entities/company-member-list'
import { CompanyProfileList } from '_DOMEnt/entities/company-profile-list'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'

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
