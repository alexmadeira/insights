import type { Team } from '_DOMEnt/entities/team'

export interface TeamRepository {
  findById(id: string): Promise<Team | null>
  create(avatar: Team): Promise<void>
  save(avatar: Team): Promise<void>
  delete(avatar: Team): Promise<void>
}
