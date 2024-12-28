import type { TeamAvatarRepository } from '_DOMApp/repositories/team-avatar-repository'
import type { TeamMemberRepository } from '_DOMApp/repositories/team-member-repository'
import type { TeamProfileRepository } from '_DOMApp/repositories/team-profile-repository'
import type { TeamRepository } from '_DOMApp/repositories/team-repository'
import type { Team } from '_DOMEnt/entities/team'

export class InMemoryTeamRepository implements TeamRepository {
  public itens: Team[] = []

  constructor(
    private readonly teamAvatarRepository: TeamAvatarRepository,
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly teamProfileRepository: TeamProfileRepository,
  ) {}

  async findById(teamId: string) {
    const team = this.itens.find((item) => item.id.toString() === teamId)

    if (!team) return null
    return team
  }

  async create(team: Team) {
    this.itens.push(team)

    this.teamAvatarRepository.createMany(team.avatars.getItems())
    this.teamMemberRepository.createMany(team.members.getItems())
    this.teamProfileRepository.createMany(team.profiles.getItems())
  }

  async save(team: Team) {
    const itemIndex = this.itens.findIndex((item) => item.id === team.id)
    this.itens[itemIndex] = team

    this.teamAvatarRepository.createMany(team.avatars.getNewItems())
    this.teamAvatarRepository.deleteMany(team.avatars.getRemovedItems())

    this.teamMemberRepository.createMany(team.members.getNewItems())
    this.teamMemberRepository.deleteMany(team.members.getRemovedItems())

    this.teamProfileRepository.createMany(team.profiles.getNewItems())
    this.teamProfileRepository.deleteMany(team.profiles.getRemovedItems())
  }

  async delete(team: Team) {
    const itemIndex = this.itens.findIndex((item) => item.id === team.id)
    this.itens.splice(itemIndex, 1)

    this.teamAvatarRepository.deleteManyByTeamId(team.id.toString())
    this.teamMemberRepository.deleteManyByTeamId(team.id.toString())
    this.teamProfileRepository.deleteManyByTeamId(team.id.toString())
  }
}
