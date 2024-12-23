import type { AvatarRepository } from '_DOMApp/repositories/avatar-repository'
import type { Avatar, TAvatarProps } from '_DOMEnt/entities/avatar'

import { DomainEvents } from '_COR/events/domain-events'

export class InMemoryAvatarRepository implements AvatarRepository {
  public itens: Avatar<TAvatarProps>[] = []

  async findById(avatarId: string) {
    const avatar = this.itens.find((item) => item.id.toString() === avatarId)

    if (!avatar) return null
    return avatar
  }

  async create(avatar: Avatar<TAvatarProps>) {
    this.itens.push(avatar)
    DomainEvents.dispatchEventsForAggregate(avatar.id)
  }

  async save(avatar: Avatar<TAvatarProps>) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens[itemIndex] = avatar
  }

  async delete(avatar: Avatar<TAvatarProps>) {
    const itemIndex = this.itens.findIndex((item) => item.id === avatar.id)
    this.itens.splice(itemIndex, 1)
  }
}
