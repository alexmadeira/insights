import type { CompanyRepository } from '_DOMApp/repositories/company-repository'

import { Company } from '_DOMEnt/entities/company'

export class InMemoryCompanyRepository implements CompanyRepository {
  public itens: Company[] = []

  async findById(companyId: string) {
    const company = this.itens.find((item) => item.id.toString() === companyId)

    if (!company) return null
    return company
  }

  async create(company: Company) {
    this.itens.push(company)
  }

  async save(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens[itemIndex] = company
  }

  async delete(company: Company) {
    const itemIndex = this.itens.findIndex((item) => item.id === company.id)
    this.itens.splice(itemIndex, 1)
  }
}
