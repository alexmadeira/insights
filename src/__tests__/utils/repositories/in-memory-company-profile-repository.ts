import type { CompanyProfileRepository } from '_DOMApp/repositories/company-profile-repository'
import type { CompanyProfile } from '_DOMEnt/entities/company-profile'

export class InMemoryCompanyProfileRepository implements CompanyProfileRepository {
  public itens: CompanyProfile[] = []

  async create(companyProfile: CompanyProfile) {
    this.itens.push(companyProfile)
  }

  async createMany(profiles: CompanyProfile[]) {
    this.itens.push(...profiles)
  }

  async deleteMany(profiles: CompanyProfile[]) {
    this.itens = this.itens.filter((item) => !profiles.some((profile) => profile.equals(item)))
  }

  async findManyByCompanyId(companyId: string) {
    return this.itens.filter((item) => item.companyId.toString() === companyId)
  }

  async deleteManyByCompanyId(companyId: string) {
    this.itens = this.itens.filter((item) => item.companyId.toString() !== companyId)
  }
}