import type { Team } from '_DOMEnt/entities/team'

export interface TeamRepository {
  findById(id: string): Promise<Team | null>
  create(avatar: Team): Promise<Team>
  save(avatar: Team): Promise<Team>
  delete(avatar: Team): Promise<void>
}
