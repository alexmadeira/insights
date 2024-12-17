import type { IUserRepository } from '@DOMTypes/application/repositories/user-repository'

import { User } from '_DOMEnt/entities/user'

export class InMemoryUserRepository implements IUserRepository {
  public itens: User[] = []

  async findById(userId: string) {
    const user = this.itens.find((item) => item.id.toString() === userId)

    if (!user) return null
    return user
  }

  async create(user: User) {
    this.itens.push(user)
  }

  async save(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens[itemIndex] = user
  }

  async delete(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens.splice(itemIndex, 1)
  }
}
