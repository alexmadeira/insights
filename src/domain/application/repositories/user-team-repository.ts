import type { UserTeam } from '_DOMEnt/entities/user-team'

export abstract class UserTeamRepository {
  abstract findManyByUserId(userId: string): Promise<UserTeam[]>
  abstract deleteManyByUserId(userId: string): Promise<void>
}
