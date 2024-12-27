import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { MemberAvatar } from './member-avatar'

export class MemberAvatarList extends WatchedList<MemberAvatar> {
  compareItems(a: MemberAvatar, b: MemberAvatar): boolean {
    return a.avatarId.equals(b.avatarId)
  }

  static create(memberId: UniqueEntityID, avatarsIds: string[]) {
    return new MemberAvatarList(
      avatarsIds.map((avatarId) => {
        return MemberAvatar.create({
          memberId,
          avatarId: new UniqueEntityID(avatarId),
        })
      }),
    )
  }
}
