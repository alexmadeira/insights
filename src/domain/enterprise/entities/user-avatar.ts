import type { UniqueEntityID } from '_COR/entities/unique-entity-id'
import type { IUserAvatar, TUserAvatarProps } from '@DOMTypes/enterprise/entities/user-avatar'

import { Optional } from '@CORTypes/optional'

import { Avatar } from './avatar'

export type * from '@DOMTypes/enterprise/entities/user-avatar'

export class UserAvatar extends Avatar<TUserAvatarProps> implements IUserAvatar {
  static create({ createdAt, ...rest }: Optional<TUserAvatarProps, 'createdAt'>, id?: UniqueEntityID) {
    return new UserAvatar(
      {
        createdAt: createdAt ?? new Date(),
        ...rest,
      },
      id,
    )
  }

  public get userId() {
    return this._props.userId
  }

  public set userId(userId: UniqueEntityID | undefined) {
    this._props.userId = userId
  }
}
