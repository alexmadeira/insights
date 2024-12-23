import type { UserAvatarRepository } from '_DOMApp/repositories/user-avatar-repository'
import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type { User } from '_DOMEnt/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public itens: User[] = []

  constructor(private readonly userAvatarRepository: UserAvatarRepository) {}

  async findById(userId: string) {
    const user = this.itens.find((item) => item.id.toString() === userId)

    if (!user) return null
    return user
  }

  async create(user: User) {
    this.itens.push(user)
    this.userAvatarRepository.create(user.avatar)
  }

  async save(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens[itemIndex] = user

    this.userAvatarRepository.save(user.avatar)
  }

  async delete(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens.splice(itemIndex, 1)

    this.userAvatarRepository.delete(user.avatar)
  }
}
