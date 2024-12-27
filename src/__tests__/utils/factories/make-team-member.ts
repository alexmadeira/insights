import type { TTeamMemberProps } from '_DOMEnt/entities/team-member'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { TeamMember } from '_DOMEnt/entities/team-member'

export function makeTeamMember(overrides: Partial<TTeamMemberProps> = {}, id?: UniqueEntityID) {
  return TeamMember.create(
    {
      teamId: new UniqueEntityID(),
      memberId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
