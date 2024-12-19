import type { UserRepository } from '_DOMApp/repositories/user-repository'

import { DomainEvents } from '_COR/events/domain-events'
import { UserTeamRepository } from '_DOMApp/repositories/user-team-repository'
import { User } from '_DOMEnt/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public itens: User[] = []

  constructor(private readonly userTeamRepository: UserTeamRepository) {}

  async findById(userId: string) {
    const user = this.itens.find((item) => item.id.toString() === userId)

    if (!user) return null
    return user
  }

  async create(user: User) {
    this.itens.push(user)
    DomainEvents.dispatchEventsForAggregate(user.id)
  }

  async save(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens[itemIndex] = user
  }

  async delete(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens.splice(itemIndex, 1)
    this.userTeamRepository.deleteManyByUserId(user.id.toString())
  }
}
