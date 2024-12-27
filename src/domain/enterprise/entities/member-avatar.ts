import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IMemberAvatar, TMemberAvatarProps } from '@DOMTypes/enterprise/entities/member-avatar'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/member-avatar'

export class MemberAvatar extends Entity<TMemberAvatarProps> implements IMemberAvatar {
  static create(props: TMemberAvatarProps, id?: UniqueEntityID) {
    return new MemberAvatar(props, id)
  }

  public get memberId() {
    return this._props.memberId
  }

  public get avatarId() {
    return this._props.avatarId
  }
}
