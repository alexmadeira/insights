import type { MemberCompanyRepository } from '_DOM/application/repositories/member-company-repository'
import type { MemberCompany } from '_DOM/enterprise/entities/member-company'

export class InMemoryMemberCompanyRepository implements MemberCompanyRepository {
  public itens: MemberCompany[] = []

  async create(memberCompany: MemberCompany) {
    this.itens.push(memberCompany)

    return memberCompany
  }

  async createMany(companies: MemberCompany[]) {
    this.itens.push(...companies)
  }

  async deleteMany(companies: MemberCompany[]) {
    this.itens = this.itens.filter((item) => !companies.some((company) => company.equals(item)))
  }

  async findManyByMemberId(memberId: string) {
    return this.itens.filter((item) => item.memberId.toString() === memberId)
  }

  async deleteManyByMemberId(memberId: string) {
    this.itens = this.itens.filter((item) => item.memberId.toString() !== memberId)
  }
}
