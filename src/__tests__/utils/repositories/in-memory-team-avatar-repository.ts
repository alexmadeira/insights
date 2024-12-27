import type { TeamAvatarRepository } from '_DOMApp/repositories/team-avatar-repository'
import type { TeamAvatar } from '_DOMEnt/entities/team-avatar'

export class InMemoryTeamAvatarRepository implements TeamAvatarRepository {
  public itens: TeamAvatar[] = []

  async create(teamAvatar: TeamAvatar) {
    this.itens.push(teamAvatar)
  }

  async createMany(avatars: TeamAvatar[]) {
    this.itens.push(...avatars)
  }

  async deleteMany(avatars: TeamAvatar[]) {
    this.itens = this.itens.filter((item) => !avatars.some((avatar) => avatar.equals(item)))
  }

  async findManyByTeamId(teamId: string) {
    return this.itens.filter((item) => item.teamId.toString() === teamId)
  }

  async deleteManyByTeamId(teamId: string) {
    this.itens = this.itens.filter((item) => item.teamId.toString() !== teamId)
  }
}
