import type { TeamMember } from '_DOMEnt/entities/team-member'

export abstract class TeamMemberRepository {
  abstract createMany(members: TeamMember[]): Promise<void>
  abstract deleteMany(members: TeamMember[]): Promise<void>
  abstract findManyByTeamId(companyId: string): Promise<TeamMember[]>
  abstract deleteManyByTeamId(companyId: string): Promise<void>
}
