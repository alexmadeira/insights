import type { AvatarRepository } from '_DOM/application/repositories/avatar-repository'
import type { Avatar } from '_DOM/enterprise/entities/avatar'

export class InMemoryAvatarRepository implements AvatarRepository {
  public itens: Avatar[] = []

  async findById(avatarId: string) {
    const avatar = this.itens.find((item) => item.id.toString() === avatarId)

    if (!avatar) return null
    return avatar
  }

  async create(avatar: Avatar) {
    this.itens.push(avatar)

    return avatar
  }

  async save(avatar: Avatar) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens[itemIndex] = avatar

    return avatar
  }

  async delete(avatar: Avatar) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens.splice(itemIndex, 1)
  }
}
