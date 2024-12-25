import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IMemberAvatar, TMemberAvatarProps } from '@DOMTypes/enterprise/entities/member-avatar'

import { Optional } from '@CORTypes/optional'

import { Avatar } from './avatar'

export type * from '@DOMTypes/enterprise/entities/member-avatar'

export class MemberAvatar extends Avatar<TMemberAvatarProps> implements IMemberAvatar {
  static create(props: Optional<TMemberAvatarProps, 'createdAt'>, id?: UniqueEntityID) {
    return new MemberAvatar(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  public get memberId() {
    return this._props.memberId
  }

  public set memberId(memberId: UniqueEntityID | undefined) {
    this._props.memberId = memberId
  }
}
