import type { TTeamProps } from '_DOMEnt/entities/team'

import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Team } from '_DOMEnt/entities/team'
import { TeamAvatarList } from '_DOMEnt/entities/team-avatar-list'
import { TeamMemberList } from '_DOMEnt/entities/team-member-list'
import { TeamProfileList } from '_DOMEnt/entities/team-profile-list'

export function makeTeam(overrides: Partial<TTeamProps> = {}, id?: UniqueEntityID) {
  const name = faker.company.name()
  return Team.create(
    {
      name,
      company: new UniqueEntityID(),
      avatars: new TeamAvatarList(),
      members: new TeamMemberList(),
      profiles: new TeamProfileList(),
      ...overrides,
    },
    id,
  )
}
