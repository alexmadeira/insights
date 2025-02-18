import type { TTeamAvatarProps } from '_DOM/enterprise/entities/team-avatar'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { TeamAvatar } from '_DOM/enterprise/entities/team-avatar'

export function makeTeamAvatar(overrides: Partial<TTeamAvatarProps> = {}, id?: UniqueEntityID) {
  return TeamAvatar.create(
    {
      teamId: new UniqueEntityID(),
      avatarId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
