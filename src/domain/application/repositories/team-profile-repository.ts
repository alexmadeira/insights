import type { TeamProfile } from '_DOM/enterprise/entities/team-profile'

export interface TeamProfileRepository {
  create(teamProfile: TeamProfile): Promise<TeamProfile>
  createMany(teamProfile: TeamProfile[]): Promise<void>
  deleteMany(teamProfile: TeamProfile[]): Promise<void>
  findManyByTeamId(companyId: string): Promise<TeamProfile[]>
  deleteManyByTeamId(companyId: string): Promise<void>
}
