import type { TCompanyProps } from '_DOMEnt/entities/company'

import { randomUUID } from 'node:crypto'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatar } from '_DOMEnt/entities/company-avatar'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'
import { faker } from '@faker-js/faker'

export function makeCompany(overrides: Partial<TCompanyProps> = {}, id?: UniqueEntityID) {
  const name = faker.company.name()

  return Company.create(
    {
      name,
      members: [randomUUID()],
      profiles: [randomUUID()],
      teams: new CompanyTeamList(),
      owner: new UniqueEntityID(randomUUID()),
      avatar: CompanyAvatar.create({ name }),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
