import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type { User } from '_DOMEnt/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public itens: User[] = []

  async findById(userId: string) {
    const user = this.itens.find((item) => item.id.toString() === userId)

    if (!user) return null
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.itens.find((item) => item.email === email)

    if (!user) return null
    return user
  }

  async findByIndetifier(indetifier: string): Promise<User | null> {
    const user = this.itens.find((item) => item.indetifier === indetifier)

    if (!user) return null
    return user
  }

  async create(user: User) {
    this.itens.push(user)

    return user
  }

  async save(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens[itemIndex] = user

    return user
  }

  async delete(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens.splice(itemIndex, 1)
  }
}
