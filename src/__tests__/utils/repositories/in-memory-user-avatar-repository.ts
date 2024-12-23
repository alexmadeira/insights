import type { UserAvatarRepository } from '_DOMApp/repositories/user-avatar-repository'
import type { UserAvatar } from '_DOMEnt/entities/user-avatar'

export class InMemoryUserAvatarRepository implements UserAvatarRepository {
  public itens: UserAvatar[] = []

  async findByAvatarId(avatarId: string) {
    const userAvatar = this.itens.find((item) => item.id.equals(avatarId))

    if (!userAvatar) return null
    return userAvatar
  }

  async create(userAvatar: UserAvatar) {
    this.itens.push(userAvatar)
  }

  async save(userAvatar: UserAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(userAvatar.id))

    this.itens[itemIndex] = userAvatar
  }

  async delete(userAvatar: UserAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(userAvatar.id))
    this.itens.splice(itemIndex, 1)
  }
}
