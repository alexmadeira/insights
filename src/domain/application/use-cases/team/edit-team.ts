import type { TeamAvatarRepository } from '_DOM/application/repositories/team-avatar-repository'
import type { TeamMemberRepository } from '_DOM/application/repositories/team-member-repository'
import type { TeamProfileRepository } from '_DOM/application/repositories/team-profile-repository'
import type { TeamRepository } from '_DOM/application/repositories/team-repository'
import type {
  IEditTeamUseCase,
  TEditTeamUseCaseRequest,
  TEditTeamUseCaseResponse,
} from '@DOMTypes/application/use-cases/team/edit-team'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { TeamAvatar } from '_DOM/enterprise/entities/team-avatar'
import { TeamAvatarList } from '_DOM/enterprise/entities/team-avatar-list'
import { TeamMember } from '_DOM/enterprise/entities/team-member'
import { TeamMemberList } from '_DOM/enterprise/entities/team-member-list'
import { TeamProfile } from '_DOM/enterprise/entities/team-profile'
import { TeamProfileList } from '_DOM/enterprise/entities/team-profile-list'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

export class EditTeamUseCase implements IEditTeamUseCase {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly teamAvatarRepository: TeamAvatarRepository,
    private readonly teamMemberRepository: TeamMemberRepository,
    private readonly teamProfileRepository: TeamProfileRepository,
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
    const profiles = await this.teamProfileRepository.findManyByTeamId(teamId)

    const teamAvatarList = new TeamAvatarList(avatars)
    const teamMemberList = new TeamMemberList(members)
    const teamProfileList = new TeamProfileList(profiles)

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
    teamProfileList.update(
      profilesIds.map((profileId) =>
        TeamProfile.create({
          teamId: team.id,
          profileId: new UniqueEntityID(profileId),
        }),
      ),
    )

    team.name = name
    team.avatars = teamAvatarList
    team.members = teamMemberList
    team.profiles = teamProfileList

    await this.teamRepository.save(team)

    return right({ team })
  }
}
