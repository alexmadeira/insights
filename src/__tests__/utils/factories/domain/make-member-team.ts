import type { TMemberTeamProps } from '_DOM/enterprise/entities/member-team'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { MemberTeam } from '_DOM/enterprise/entities/member-team'

export function makeMemberTeam(overrides: Partial<TMemberTeamProps> = {}, id?: UniqueEntityID) {
  return MemberTeam.create(
    {
      memberId: new UniqueEntityID(),
      teamId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
