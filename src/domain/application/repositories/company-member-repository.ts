import type { CompanyMember } from '_DOM/enterprise/entities/company-member'

export interface CompanyMemberRepository {
  create(companyMember: CompanyMember): Promise<CompanyMember>
  createMany(companyMember: CompanyMember[]): Promise<void>
  deleteMany(companyMember: CompanyMember[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyMember[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
