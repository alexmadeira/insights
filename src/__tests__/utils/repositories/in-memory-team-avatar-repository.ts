import type { TeamAvatarRepository } from '_DOMApp/repositories/team-avatar-repository'
import type { TeamAvatar } from '_DOMEnt/entities/team-avatar'

export class InMemoryTeamAvatarRepository implements TeamAvatarRepository {
  public itens: TeamAvatar[] = []

  async findByAvatarId(avatarId: string) {
    const teamAvatar = this.itens.find((item) => item.id.equals(avatarId))

    if (!teamAvatar) return null
    return teamAvatar
  }

  async create(teamAvatar: TeamAvatar) {
    this.itens.push(teamAvatar)
  }

  async save(teamAvatar: TeamAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(teamAvatar.id))

    this.itens[itemIndex] = teamAvatar
  }

  async delete(teamAvatar: TeamAvatar) {
    const itemIndex = this.itens.findIndex((item) => item.id.equals(teamAvatar.id))
    this.itens.splice(itemIndex, 1)
  }
}
