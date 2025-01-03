import type { CompanyProfile } from '_DOMEnt/entities/company-profile'

export interface CompanyProfileRepository {
  createMany(profiles: CompanyProfile[]): Promise<void>
  deleteMany(profiles: CompanyProfile[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyProfile[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
