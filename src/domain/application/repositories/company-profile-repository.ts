import type { CompanyProfile } from '_DOMEnt/entities/company-profile'

export interface CompanyProfileRepository {
  create(companyProfile: CompanyProfile): Promise<CompanyProfile>
  createMany(companyProfile: CompanyProfile[]): Promise<void>
  deleteMany(companyProfile: CompanyProfile[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyProfile[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
