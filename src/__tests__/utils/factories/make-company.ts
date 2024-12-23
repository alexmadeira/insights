import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TCompanyProps } from '_DOMEnt/entities/company'

import { randomUUID } from 'node:crypto'

import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatar } from '_DOMEnt/entities/company-avatar'
import { faker } from '@faker-js/faker'

export function makeCompany(overrides: Partial<TCompanyProps> = {}, id?: UniqueEntityID) {
  const name = faker.company.name()

  return Company.create(
    {
      name,
      teams: [randomUUID()],
      members: [randomUUID()],
      profiles: [randomUUID()],
      owner: randomUUID(),
      avatar: CompanyAvatar.create({ name }),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
