import type { CompanyAvatarRepository } from '_DOMApp/repositories/company-avatar-repository'
import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type { Company } from '_DOMEnt/entities/company'

export class InMemoryCompanyRepository implements CompanyRepository {
  public itens: Company[] = []
  constructor(private readonly companyAvatarRepository: CompanyAvatarRepository) {}

  async findById(companyId: string) {
    const company = this.itens.find((item) => item.id.toString() === companyId)

    if (!company) return null
    return company
  }

  async create(company: Company) {
    this.itens.push(company)

    this.companyAvatarRepository.create(company.avatar)
  }

  async save(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens[itemIndex] = company

    this.companyAvatarRepository.save(company.avatar)
  }

  async delete(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens.splice(itemIndex, 1)

    this.companyAvatarRepository.delete(company.avatar)
  }
}
