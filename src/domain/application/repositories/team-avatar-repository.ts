import type { TeamAvatar } from '_DOMEnt/entities/team-avatar'

export abstract class TeamAvatarRepository {
  abstract findByAvatarId(id: string): Promise<TeamAvatar | null>
  abstract create(teamAvatar: TeamAvatar): Promise<void>
  abstract save(teamAvatar: TeamAvatar): Promise<void>
  abstract delete(teamAvatar: TeamAvatar): Promise<void>
}
