import type { TeamProfile } from '_DOMEnt/entities/team-profile'

export abstract class TeamProfileRepository {
  abstract createMany(profiles: TeamProfile[]): Promise<void>
  abstract deleteMany(profiles: TeamProfile[]): Promise<void>
  abstract findManyByTeamId(companyId: string): Promise<TeamProfile[]>
  abstract deleteManyByTeamId(companyId: string): Promise<void>
}
