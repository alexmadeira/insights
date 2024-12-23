import type { TeamRepository } from '_DOMApp/repositories/team-repository'
import type {
  ICreateTeamUseCase,
  TCreateTeamUseCaseRequest,
  TCreateTeamUseCaseResponse,
} from '@DOMTypes/application/use-cases/team/create-team'

import { right } from '_COR/either'
import { Team } from '_DOMEnt/entities/team'
import { TeamAvatar } from '_DOMEnt/entities/team-avatar'

export class CreateTeamUseCase implements ICreateTeamUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({
    companyId,
    membesIds,
    profilesIds,
    ...rest
  }: TCreateTeamUseCaseRequest): Promise<TCreateTeamUseCaseResponse> {
    const team = Team.create({
      company: companyId,
      members: membesIds,
      profiles: profilesIds,
      avatar: TeamAvatar.create({ name: rest.name }),
      ...rest,
    })

    team.avatar.teamId = team.id
    await this.teamRepository.create(team)

    return right({ team })
  }
}
