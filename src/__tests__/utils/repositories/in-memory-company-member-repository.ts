import type { CompanyMemberRepository } from '_DOMApp/repositories/company-member-repository'
import type { CompanyMember } from '_DOMEnt/entities/company-member'

export class InMemoryCompanyMemberRepository implements CompanyMemberRepository {
  public itens: CompanyMember[] = []

  async create(companyMember: CompanyMember) {
    this.itens.push(companyMember)

    return companyMember
  }

  async createMany(members: CompanyMember[]) {
    this.itens.push(...members)
  }

  async deleteMany(memberss: CompanyMember[]) {
    this.itens = this.itens.filter((item) => !memberss.some((member) => member.equals(item)))
  }

  async findManyByCompanyId(companyId: string) {
    return this.itens.filter((item) => item.companyId.toString() === companyId)
  }

  async deleteManyByCompanyId(companyId: string) {
    this.itens = this.itens.filter((item) => item.companyId.toString() !== companyId)
  }
}
