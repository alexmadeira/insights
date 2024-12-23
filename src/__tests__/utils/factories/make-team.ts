import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { TTeamProps } from '_DOMEnt/entities/team'

import { randomUUID } from 'node:crypto'

import { Team } from '_DOMEnt/entities/team'
import { TeamAvatar } from '_DOMEnt/entities/team-avatar'
import { faker } from '@faker-js/faker'

export function makeTeam(overrides: Partial<TTeamProps> = {}, id?: UniqueEntityID) {
  const name = faker.company.name()
  return Team.create(
    {
      name,
      members: [randomUUID()],
      profiles: [randomUUID()],
      company: randomUUID(),
      avatar: TeamAvatar.create({ name }),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
