import type { CompanyMember } from '_DOMEnt/entities/company-member'

export abstract class CompanyMemberRepository {
  abstract createMany(members: CompanyMember[]): Promise<void>
  abstract deleteMany(members: CompanyMember[]): Promise<void>
  abstract findManyByCompanyId(companyId: string): Promise<CompanyMember[]>
  abstract deleteManyByCompanyId(companyId: string): Promise<void>
}
