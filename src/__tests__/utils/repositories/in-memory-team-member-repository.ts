import type { TeamMemberRepository } from '_DOMApp/repositories/team-member-repository'
import type { TeamMember } from '_DOMEnt/entities/team-member'

export class InMemoryTeamMemberRepository implements TeamMemberRepository {
  public itens: TeamMember[] = []

  async create(teamMember: TeamMember) {
    this.itens.push(teamMember)

    return teamMember
  }

  async createMany(members: TeamMember[]) {
    this.itens.push(...members)
  }

  async deleteMany(memberss: TeamMember[]) {
    this.itens = this.itens.filter((item) => !memberss.some((member) => member.equals(item)))
  }

  async findManyByTeamId(teamId: string) {
    return this.itens.filter((item) => item.teamId.toString() === teamId)
  }

  async deleteManyByTeamId(teamId: string) {
    this.itens = this.itens.filter((item) => item.teamId.toString() !== teamId)
  }
}
