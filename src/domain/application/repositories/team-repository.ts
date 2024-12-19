import type { Team } from '_DOMEnt/entities/team'

export abstract class TeamRepository {
  abstract findById(id: string): Promise<Team | null>
  abstract create(avatar: Team): Promise<void>
  abstract save(avatar: Team): Promise<void>
  abstract delete(avatar: Team): Promise<void>
}
