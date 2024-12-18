import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TTeamProps } from '_DOMEnt/entities/team'

import { randomUUID } from 'node:crypto'

import { Team } from '_DOMEnt/entities/team'
import { faker } from '@faker-js/faker'

export function makeTeam(overrides: Partial<TTeamProps> = {}, id?: UniqueEntityID) {
  return Team.create(
    {
      name: faker.company.name(),
      members: [randomUUID()],
      profiles: [randomUUID()],
      company: randomUUID(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
