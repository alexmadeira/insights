import type { CompanyTeam } from '_DOMEnt/entities/company-team'

export abstract class CompanyTeamRepository {
  abstract createMany(teams: CompanyTeam[]): Promise<void>
  abstract deleteMany(teams: CompanyTeam[]): Promise<void>
  abstract findManyByCompanyId(companyId: string): Promise<CompanyTeam[]>
  abstract deleteManyByCompanyId(companyId: string): Promise<void>
}
