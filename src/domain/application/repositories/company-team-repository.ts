import type { CompanyTeam } from '_DOM/enterprise/entities/company-team'

export interface CompanyTeamRepository {
  create(companyTeam: CompanyTeam): Promise<CompanyTeam>
  createMany(companyTeam: CompanyTeam[]): Promise<void>
  deleteMany(companyTeam: CompanyTeam[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyTeam[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
