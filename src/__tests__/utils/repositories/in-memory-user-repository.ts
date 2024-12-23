import type { UserAvatarRepository } from '_DOMApp/repositories/user-avatar-repository'
import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type { UserTeamRepository } from '_DOMApp/repositories/user-team-repository'
import type { User } from '_DOMEnt/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public itens: User[] = []

  constructor(
    private readonly userAvatarRepository: UserAvatarRepository,
    private readonly userTeamRepository: UserTeamRepository,
  ) {}

  async findById(userId: string) {
    const user = this.itens.find((item) => item.id.toString() === userId)

    if (!user) return null
    return user
  }

  async create(user: User) {
    this.itens.push(user)

    this.userAvatarRepository.create(user.avatar)
    this.userTeamRepository.createMany(user.teams.getItems())
  }

  async save(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens[itemIndex] = user

    this.userAvatarRepository.save(user.avatar)

    this.userTeamRepository.createMany(user.teams.getNewItems())
    this.userTeamRepository.deleteMany(user.teams.getRemovedItems())
  }

  async delete(user: User) {
    const itemIndex = this.itens.findIndex((item) => item.id === user.id)
    this.itens.splice(itemIndex, 1)

    this.userAvatarRepository.delete(user.avatar)
    this.userTeamRepository.deleteManyByUserId(user.id.toString())
  }
}
