import type { TeamProfileRepository } from '_DOM/application/repositories/team-profile-repository'
import type { TeamProfile } from '_DOM/enterprise/entities/team-profile'

export class PrismaTeamProfileRepository implements TeamProfileRepository {
  public itens: TeamProfile[] = []

  async create(teamProfile: TeamProfile) {
    this.itens.push(teamProfile)
  }

  async createMany(profiles: TeamProfile[]) {
    this.itens.push(...profiles)
  }

  async deleteMany(profiless: TeamProfile[]) {
    this.itens = this.itens.filter((item) => !profiless.some((profile) => profile.equals(item)))
  }

  async findManyByTeamId(teamId: string) {
    return this.itens.filter((item) => item.teamId.toString() === teamId)
  }

  async deleteManyByTeamId(teamId: string) {
    this.itens = this.itens.filter((item) => item.teamId.toString() !== teamId)
  }
}
