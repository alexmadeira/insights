import type { CompanyTeam } from '_DOMEnt/entities/company-team'

export interface CompanyTeamRepository {
  createMany(teams: CompanyTeam[]): Promise<void>
  deleteMany(teams: CompanyTeam[]): Promise<void>
  findManyByCompanyId(companyId: string): Promise<CompanyTeam[]>
  deleteManyByCompanyId(companyId: string): Promise<void>
}
