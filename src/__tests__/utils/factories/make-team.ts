import type { TTeamProps } from '_DOMEnt/entities/team'

import { randomUUID } from 'node:crypto'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Team } from '_DOMEnt/entities/team'
import { TeamAvatarList } from '_DOMEnt/entities/team-avatar-list'
import { faker } from '@faker-js/faker'

export function makeTeam(overrides: Partial<TTeamProps> = {}, id?: UniqueEntityID) {
  const name = faker.company.name()
  return Team.create(
    {
      name,
      members: [randomUUID()],
      profiles: [randomUUID()],
      company: new UniqueEntityID(),
      avatars: new TeamAvatarList(),
      createdAt: new Date(),
      ...overrides,
    },
    id,
  )
}
