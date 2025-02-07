import type { CompanyTeamRepository } from '_DOMApp/repositories/company-team-repository'
import type { CompanyTeam } from '_DOMEnt/entities/company-team'

export class InMemoryCompanyTeamRepository implements CompanyTeamRepository {
  public itens: CompanyTeam[] = []

  async create(companyTeam: CompanyTeam) {
    this.itens.push(companyTeam)

    return companyTeam
  }

  async createMany(teams: CompanyTeam[]) {
    this.itens.push(...teams)
  }

  async deleteMany(teams: CompanyTeam[]) {
    this.itens = this.itens.filter((item) => !teams.some((team) => team.equals(item)))
  }

  async findManyByCompanyId(companyId: string) {
    return this.itens.filter((item) => item.companyId.toString() === companyId)
  }

  async deleteManyByCompanyId(companyId: string) {
    this.itens = this.itens.filter((item) => item.companyId.toString() !== companyId)
  }
}
