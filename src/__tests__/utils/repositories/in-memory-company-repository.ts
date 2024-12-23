import type { CompanyAvatarRepository } from '_DOMApp/repositories/company-avatar-repository'
import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type { Company } from '_DOMEnt/entities/company'

import { CompanyTeamRepository } from '_DOMApp/repositories/company-team-repository'

export class InMemoryCompanyRepository implements CompanyRepository {
  public itens: Company[] = []
  constructor(
    private readonly companyAvatarRepository: CompanyAvatarRepository,
    private readonly companyTeamRepository: CompanyTeamRepository,
  ) {}

  async findById(companyId: string) {
    const company = this.itens.find((item) => item.id.toString() === companyId)

    if (!company) return null
    return company
  }

  async create(company: Company) {
    this.itens.push(company)

    this.companyAvatarRepository.create(company.avatar)
    this.companyTeamRepository.createMany(company.teams.getItems())
  }

  async save(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens[itemIndex] = company

    this.companyAvatarRepository.save(company.avatar)
    this.companyTeamRepository.createMany(company.teams.getNewItems())
    this.companyTeamRepository.deleteMany(company.teams.getRemovedItems())
  }

  async delete(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens.splice(itemIndex, 1)

    this.companyAvatarRepository.delete(company.avatar)
    this.companyTeamRepository.deleteManyByCompanyId(company.id.toString())
  }
}
