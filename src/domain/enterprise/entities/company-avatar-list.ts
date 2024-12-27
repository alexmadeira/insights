import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { WatchedList } from '_COR/entities/watched-list'

import { CompanyAvatar } from './company-avatar'

export class CompanyAvatarList extends WatchedList<CompanyAvatar> {
  compareItems(a: CompanyAvatar, b: CompanyAvatar): boolean {
    return a.avatarId.equals(b.avatarId)
  }

  static create(companyId: UniqueEntityID, avatarsIds: string[]) {
    return new CompanyAvatarList(
      avatarsIds.map((avatarId) => {
        return CompanyAvatar.create({
          companyId,
          avatarId: new UniqueEntityID(avatarId),
        })
      }),
    )
  }
}
