import type { TeamAvatar } from '_DOMEnt/entities/team-avatar'

export abstract class TeamAvatarRepository {
  abstract createMany(avatars: TeamAvatar[]): Promise<void>
  abstract deleteMany(avatars: TeamAvatar[]): Promise<void>
  abstract findManyByTeamId(teamId: string): Promise<TeamAvatar[]>
  abstract deleteManyByTeamId(teamId: string): Promise<void>
}
