import type { TTeamProps } from '_DOM/enterprise/entities/team'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Team } from '_DOM/enterprise/entities/team'
import { TeamAvatarList } from '_DOM/enterprise/entities/team-avatar-list'
import { TeamMemberList } from '_DOM/enterprise/entities/team-member-list'
import { TeamProfileList } from '_DOM/enterprise/entities/team-profile-list'
import { faker } from '@faker-js/faker'

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
