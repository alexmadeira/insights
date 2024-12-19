import type { TeamRepository } from '_DOMApp/repositories/team-repository'
import type {
  IEditTeamUseCase,
  TEditTeamUseCaseRequest,
  TEditTeamUseCaseResponse,
} from '@DOMTypes/application/use-cases/team/edit-team'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class EditTeamUseCase implements IEditTeamUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({
    teamId,
    name,
    companyId,

    membersIds,
    profilesIds,
  }: TEditTeamUseCaseRequest): Promise<TEditTeamUseCaseResponse> {
    const team = await this.teamRepository.findById(teamId)

    if (!team) {
      return left(new ResourceNotFoundError())
    }

    team.name = name
    team.company = companyId
    team.members = membersIds
    team.profiles = profilesIds

    await this.teamRepository.save(team)

    return right({ team })
  }
}
