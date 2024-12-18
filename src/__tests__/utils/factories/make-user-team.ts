import type { TUserTeamProps } from '_DOMEnt/entities/user-team'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { UserTeam } from '_DOMEnt/entities/user-team'

export function makeUserTeam(overrides: Partial<TUserTeamProps> = {}, id?: UniqueEntityID) {
  return UserTeam.create(
    {
      userId: new UniqueEntityID(),
      teamId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
