import type { CompanyAvatarRepository } from '_DOM/application/repositories/company-avatar-repository'
import type { CompanyMemberRepository } from '_DOM/application/repositories/company-member-repository'
import type { CompanyProfileRepository } from '_DOM/application/repositories/company-profile-repository'
import type { CompanyRepository } from '_DOM/application/repositories/company-repository'
import type { CompanyTeamRepository } from '_DOM/application/repositories/company-team-repository'
import type { Company } from '_DOM/enterprise/entities/company'

export class InMemoryCompanyRepository implements CompanyRepository {
  public itens: Company[] = []
  constructor(
    private readonly companyAvatarRepository: CompanyAvatarRepository,
    private readonly companyTeamRepository: CompanyTeamRepository,
    private readonly companyMemberRepository: CompanyMemberRepository,
    private readonly companyProfileRepository: CompanyProfileRepository,
  ) {}

  async findById(companyId: string) {
    const company = this.itens.find((item) => item.id.toString() === companyId)

    if (!company) return null
    return company
  }

  async create(company: Company) {
    this.itens.push(company)

    this.companyTeamRepository.createMany(company.teams.getItems())
    this.companyMemberRepository.createMany(company.members.getItems())
    this.companyAvatarRepository.createMany(company.avatars.getItems())
    this.companyProfileRepository.createMany(company.profiles.getItems())

    return company
  }

  async save(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens[itemIndex] = company

    this.companyTeamRepository.createMany(company.teams.getNewItems())
    this.companyTeamRepository.deleteMany(company.teams.getRemovedItems())

    this.companyAvatarRepository.createMany(company.avatars.getNewItems())
    this.companyAvatarRepository.deleteMany(company.avatars.getRemovedItems())

    this.companyMemberRepository.createMany(company.members.getNewItems())
    this.companyMemberRepository.deleteMany(company.members.getRemovedItems())

    this.companyProfileRepository.createMany(company.profiles.getNewItems())
    this.companyProfileRepository.deleteMany(company.profiles.getRemovedItems())

    return company
  }

  async delete(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens.splice(itemIndex, 1)

    this.companyTeamRepository.deleteManyByCompanyId(company.id.toString())
    this.companyAvatarRepository.deleteManyByCompanyId(company.id.toString())
    this.companyMemberRepository.deleteManyByCompanyId(company.id.toString())
    this.companyProfileRepository.deleteManyByCompanyId(company.id.toString())
  }
}
