import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { Optional } from '@CORTypes/optional'
import type { IUserAvatar, TUserAvatarProps } from '@DOMTypes/enterprise/entities/user-avatar'

import { Avatar } from './avatar'

export type * from '@DOMTypes/enterprise/entities/user-avatar'

export class UserAvatar extends Avatar<TUserAvatarProps> implements IUserAvatar {
  static create({ createdAt, ...rest }: Optional<TUserAvatarProps, 'createdAt'>, id?: UniqueEntityID) {
    return new UserAvatar(
      {
        ...rest,
        createdAt: createdAt ?? new Date(),
      },
      id,
    )
  }

  public get userId() {
    return this._props.userId
  }
}
