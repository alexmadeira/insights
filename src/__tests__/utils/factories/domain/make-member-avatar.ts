import type { TMemberAvatarProps } from '_DOM/enterprise/entities/member-avatar'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { MemberAvatar } from '_DOM/enterprise/entities/member-avatar'

export function makeMemberAvatar(overrides: Partial<TMemberAvatarProps> = {}, id?: UniqueEntityID) {
  return MemberAvatar.create(
    {
      memberId: new UniqueEntityID(),
      avatarId: new UniqueEntityID(),
      ...overrides,
    },
    id,
  )
}
