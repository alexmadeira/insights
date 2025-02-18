import type { TeamAvatar } from '_DOM/enterprise/entities/team-avatar'

export interface TeamAvatarRepository {
  create(teamAvatar: TeamAvatar): Promise<TeamAvatar>
  createMany(teamAvatar: TeamAvatar[]): Promise<void>
  deleteMany(teamAvatar: TeamAvatar[]): Promise<void>
  findManyByTeamId(teamId: string): Promise<TeamAvatar[]>
  deleteManyByTeamId(teamId: string): Promise<void>
}
