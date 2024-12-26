import type { CompanyProfile } from '_DOMEnt/entities/company-profile'

export abstract class CompanyProfileRepository {
  abstract createMany(profiles: CompanyProfile[]): Promise<void>
  abstract deleteMany(profiles: CompanyProfile[]): Promise<void>
  abstract findManyByCompanyId(companyId: string): Promise<CompanyProfile[]>
  abstract deleteManyByCompanyId(companyId: string): Promise<void>
}
