import type { TeamRepository } from '_DOMApp/repositories/team-repository'
import type {
  ICreateTeamUseCase,
  TCreateTeamUseCaseRequest,
  TCreateTeamUseCaseResponse,
} from '@DOMTypes/application/use-cases/team/create-team'

import { right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Team } from '_DOMEnt/entities/team'
import { TeamAvatarList } from '_DOMEnt/entities/team-avatar-list'

export class CreateTeamUseCase implements ICreateTeamUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute({
    companyId,
    membersIds,
    avatarsIds,
    profilesIds,
    ...rest
  }: TCreateTeamUseCaseRequest): Promise<TCreateTeamUseCaseResponse> {
    const team = Team.create({
      company: new UniqueEntityID(companyId),
      members: membersIds,
      profiles: profilesIds,
      ...rest,
    })

    team.avatars = TeamAvatarList.create(team.id, avatarsIds)

    await this.teamRepository.create(team)

    return right({ team })
  }
}
