import type { TeamAvatarRepository } from '_DOMApp/repositories/team-avatar-repository'
import type { TeamRepository } from '_DOMApp/repositories/team-repository'
import type { Team } from '_DOMEnt/entities/team'

export class InMemoryTeamRepository implements TeamRepository {
  public itens: Team[] = []

  constructor(private readonly teamAvatarRepository: TeamAvatarRepository) {}

  async findById(teamId: string) {
    const team = this.itens.find((item) => item.id.toString() === teamId)

    if (!team) return null
    return team
  }

  async create(team: Team) {
    this.itens.push(team)

    this.teamAvatarRepository.createMany(team.avatars.getItems())
  }

  async save(team: Team) {
    const itemIndex = this.itens.findIndex((item) => item.id === team.id)
    this.itens[itemIndex] = team

    this.teamAvatarRepository.createMany(team.avatars.getNewItems())
    this.teamAvatarRepository.deleteMany(team.avatars.getRemovedItems())
  }

  async delete(team: Team) {
    const itemIndex = this.itens.findIndex((item) => item.id === team.id)
    this.itens.splice(itemIndex, 1)

    this.teamAvatarRepository.deleteManyByTeamId(team.id.toString())
  }
}
