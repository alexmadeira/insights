import type { CompanyMember } from '_DOMEnt/entities/company-member'

export interface CompanyMemberRepository {
  createMany(members: CompanyMember[]): Promise<void>
  deleteMany(members: CompanyMember[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyMember[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
