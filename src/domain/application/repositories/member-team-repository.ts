import type { MemberTeam } from '_DOMEnt/entities/member-team'

export abstract class MemberTeamRepository {
  abstract createMany(teams: MemberTeam[]): Promise<void>
  abstract deleteMany(teams: MemberTeam[]): Promise<void>
  abstract findManyByMemberId(memberId: string): Promise<MemberTeam[]>
  abstract deleteManyByMemberId(memberId: string): Promise<void>
}
