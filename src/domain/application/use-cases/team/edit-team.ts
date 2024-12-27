import type { TeamAvatarRepository } from '_DOMApp/repositories/team-avatar-repository'
import type { TeamRepository } from '_DOMApp/repositories/team-repository'
import type {
  IEditTeamUseCase,
  TEditTeamUseCaseRequest,
  TEditTeamUseCaseResponse,
} from '@DOMTypes/application/use-cases/team/edit-team'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { TeamAvatar } from '_DOMEnt/entities/team-avatar'
import { TeamAvatarList } from '_DOMEnt/entities/team-avatar-list'

export class EditTeamUseCase implements IEditTeamUseCase {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly teamAvatarRepository: TeamAvatarRepository,
  ) {}

  async execute({
    teamId,
    name,
    avatarsIds,
    membersIds,
    profilesIds,
  }: TEditTeamUseCaseRequest): Promise<TEditTeamUseCaseResponse> {
    const team = await this.teamRepository.findById(teamId)
    if (!team) return left(new ResourceNotFoundError())

    const avatars = await this.teamAvatarRepository.findManyByTeamId(teamId)

    const teamAvatarList = new TeamAvatarList(avatars)

    teamAvatarList.update(
      avatarsIds.map((avatarId) =>
        TeamAvatar.create({
          teamId: team.id,
          avatarId: new UniqueEntityID(avatarId),
        }),
      ),
    )
    team.name = name
    team.avatars = teamAvatarList

    team.members = membersIds
    team.profiles = profilesIds

    await this.teamRepository.save(team)

    return right({ team })
  }
}
