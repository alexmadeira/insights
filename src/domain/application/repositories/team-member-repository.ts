import type { TeamMember } from '_DOMEnt/entities/team-member'

export interface TeamMemberRepository {
  create(teamMember: TeamMember): Promise<TeamMember>
  createMany(teamMember: TeamMember[]): Promise<void>
  deleteMany(teamMember: TeamMember[]): Promise<void>
  findManyByTeamId(companyId: string): Promise<TeamMember[]>
  deleteManyByTeamId(companyId: string): Promise<void>
}
