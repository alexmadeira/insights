import type { UserTeamRepository } from '_DOMApp/repositories/user-team-repository'

import { UserTeam } from '_DOMEnt/entities/user-team'

export class InMemoryUserTeamRepository implements UserTeamRepository {
  public itens: UserTeam[] = []

  async create(userTeam: UserTeam) {
    this.itens.push(userTeam)
  }

  async createMany(...userTeam: UserTeam[]) {
    this.itens.push(...userTeam)
  }

  async findManyByUserId(userId: string) {
    return this.itens.filter((item) => item.userId.toString() === userId)
  }

  async deleteManyByUserId(userId: string) {
    this.itens = this.itens.filter((item) => item.userId.toString() !== userId)
  }
}
