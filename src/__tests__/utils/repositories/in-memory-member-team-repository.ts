import type { MemberTeamRepository } from '_DOMApp/repositories/member-team-repository'
import type { MemberTeam } from '_DOMEnt/entities/member-team'

export class InMemoryMemberTeamRepository implements MemberTeamRepository {
  public itens: MemberTeam[] = []

  async create(memberTeam: MemberTeam) {
    this.itens.push(memberTeam)

    return memberTeam
  }

  async createMany(teams: MemberTeam[]) {
    this.itens.push(...teams)
  }

  async deleteMany(teams: MemberTeam[]) {
    this.itens = this.itens.filter((item) => !teams.some((team) => team.equals(item)))
  }

  async findManyByMemberId(memberId: string) {
    return this.itens.filter((item) => item.memberId.toString() === memberId)
  }

  async deleteManyByMemberId(memberId: string) {
    this.itens = this.itens.filter((item) => item.memberId.toString() !== memberId)
  }
}
