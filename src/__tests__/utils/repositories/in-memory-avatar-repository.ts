import type { AvatarRepository } from '_DOMApp/repositories/avatar-repository'

import { Avatar } from '_DOMEnt/entities/avatar'

export class InMemoryAvatarRepository implements AvatarRepository {
  public itens: Avatar[] = []

  async findById(avatarId: string) {
    const avatar = this.itens.find((item) => item.id.toString() === avatarId)

    if (!avatar) return null
    return avatar
  }

  async create(avatar: Avatar) {
    this.itens.push(avatar)
  }

  async save(avatar: Avatar) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens[itemIndex] = avatar
  }

  async delete(avatar: Avatar) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens.splice(itemIndex, 1)
  }
}
