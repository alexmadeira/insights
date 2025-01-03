import type { MemberTeam } from '_DOMEnt/entities/member-team'

export interface MemberTeamRepository {
  createMany(teams: MemberTeam[]): Promise<void>
  deleteMany(teams: MemberTeam[]): Promise<void>
  findManyByMemberId(memberId: string): Promise<MemberTeam[]>
  deleteManyByMemberId(memberId: string): Promise<void>
}
