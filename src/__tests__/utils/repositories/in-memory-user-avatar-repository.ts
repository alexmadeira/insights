import type { UserAvatarRepository } from '_DOMApp/repositories/user-avatar-repository'

import { UserAvatar } from '_DOMEnt/entities/user-avatar'

export class InMemoryUserAvatarRepository implements UserAvatarRepository {
  public itens: UserAvatar[] = []

  async findById(avatarId: string) {
    const avatar = this.itens.find((item) => item.id.toString() === avatarId)

    if (!avatar) return null
    return avatar
  }

  async create(avatar: UserAvatar) {
    this.itens.push(avatar)
  }

  async save(avatar: UserAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens[itemIndex] = avatar
  }

  async delete(avatar: UserAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens.splice(itemIndex, 1)
  }
}
