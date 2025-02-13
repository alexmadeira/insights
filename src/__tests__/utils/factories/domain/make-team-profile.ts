import type { TTeamProfileProps } from '_DOMEnt/entities/team-profile'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { TeamProfile } from '_DOMEnt/entities/team-profile'

export function makeTeamProfile(overrides: Partial<TTeamProfileProps> = {}, id?: UniqueEntityID) {
  return TeamProfile.create(
    {
      teamId: new UniqueEntityID(),
      profileId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
