import type { TeamAvatar } from '_DOMEnt/entities/team-avatar'

export interface TeamAvatarRepository {
  createMany(avatars: TeamAvatar[]): Promise<void>
  deleteMany(avatars: TeamAvatar[]): Promise<void>
  findManyByTeamId(teamId: string): Promise<TeamAvatar[]>
  deleteManyByTeamId(teamId: string): Promise<void>
}
