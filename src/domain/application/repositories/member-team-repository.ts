import type { MemberTeam } from '_DOM/enterprise/entities/member-team'

export interface MemberTeamRepository {
  create(memberTeam: MemberTeam): Promise<MemberTeam>
  createMany(memberTeam: MemberTeam[]): Promise<void>
  deleteMany(memberTeam: MemberTeam[]): Promise<void>
  findManyByMemberId(memberId: string): Promise<MemberTeam[]>
  deleteManyByMemberId(memberId: string): Promise<void>
}
