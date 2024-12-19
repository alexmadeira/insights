import type { TeamRepository } from '_DOMApp/repositories/team-repository'

import { Team } from '_DOMEnt/entities/team'

export class InMemoryTeamRepository implements TeamRepository {
  public itens: Team[] = []

  async findById(teamId: string) {
    const team = this.itens.find((item) => item.id.toString() === teamId)

    if (!team) return null
    return team
  }

  async create(team: Team) {
    this.itens.push(team)
  }

  async save(team: Team) {
    const itemIndex = this.itens.findIndex((item) => item.id === team.id)
    this.itens[itemIndex] = team
  }

  async delete(team: Team) {
    const itemIndex = this.itens.findIndex((item) => item.id === team.id)
    this.itens.splice(itemIndex, 1)
  }
}
