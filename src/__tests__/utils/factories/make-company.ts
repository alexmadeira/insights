import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TCompanyProps } from '_DOMEnt/entities/company'

import { randomUUID } from 'node:crypto'

import { Company } from '_DOMEnt/entities/company'
import { faker } from '@faker-js/faker'

export function makeCompany(overrides: Partial<TCompanyProps> = {}, id?: UniqueEntityID) {
  return Company.create(
    {
      name: faker.company.name(),
      teams: [randomUUID()],
      members: [randomUUID()],
      profiles: [randomUUID()],
      owner: randomUUID(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
