import type { TeamAvatarRepository } from '_DOMApp/repositories/team-avatar-repository'
import type { TeamMemberRepository } from '_DOMApp/repositories/team-member-repository'
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
import { TeamMember } from '_DOMEnt/entities/team-member'
import { TeamMemberList } from '_DOMEnt/entities/team-member-list'

export class EditTeamUseCase implements IEditTeamUseCase {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly teamAvatarRepository: TeamAvatarRepository,
    private readonly teamMemberRepository: TeamMemberRepository,
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
    const members = await this.teamMemberRepository.findManyByTeamId(teamId)

    const teamAvatarList = new TeamAvatarList(avatars)
    const teamMemberList = new TeamMemberList(members)

    teamAvatarList.update(
      avatarsIds.map((avatarId) =>
        TeamAvatar.create({
          teamId: team.id,
          avatarId: new UniqueEntityID(avatarId),
        }),
      ),
    )

    teamMemberList.update(
      membersIds.map((memberId) =>
        TeamMember.create({
          teamId: team.id,
          memberId: new UniqueEntityID(memberId),
        }),
      ),
    )

    team.name = name
    team.avatars = teamAvatarList
    team.members = teamMemberList

    team.profiles = profilesIds

    await this.teamRepository.save(team)

    return right({ team })
  }
}
