import type { TeamMember } from '_DOMEnt/entities/team-member'

export interface TeamMemberRepository {
  createMany(members: TeamMember[]): Promise<void>
  deleteMany(members: TeamMember[]): Promise<void>
  findManyByTeamId(companyId: string): Promise<TeamMember[]>
  deleteManyByTeamId(companyId: string): Promise<void>
}
