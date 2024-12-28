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
import { TeamMemberList } from '_DOMEnt/entities/team-member-list'
import { TeamProfileList } from '_DOMEnt/entities/team-profile-list'

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
      ...rest,
    })

    team.avatars = TeamAvatarList.create(team.id, avatarsIds)
    team.members = TeamMemberList.create(team.id, membersIds)
    team.profiles = TeamProfileList.create(team.id, profilesIds)

    await this.teamRepository.create(team)

    return right({ team })
  }
}
