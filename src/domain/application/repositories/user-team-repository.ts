import type { UserTeam } from '_DOMEnt/entities/user-team'

export abstract class UserTeamRepository {
  abstract createMany(teams: UserTeam[]): Promise<void>
  abstract deleteMany(teams: UserTeam[]): Promise<void>
  abstract findManyByUserId(userId: string): Promise<UserTeam[]>
  abstract deleteManyByUserId(userId: string): Promise<void>
}
