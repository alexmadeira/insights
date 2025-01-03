import type { TeamProfile } from '_DOMEnt/entities/team-profile'

export interface TeamProfileRepository {
  createMany(profiles: TeamProfile[]): Promise<void>
  deleteMany(profiles: TeamProfile[]): Promise<void>
  findManyByTeamId(companyId: string): Promise<TeamProfile[]>
  deleteManyByTeamId(companyId: string): Promise<void>
}
