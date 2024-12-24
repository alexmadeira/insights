import type { MemberRepository } from '_DOMApp/repositories/member-repository'
import type { MemberTeamRepository } from '_DOMApp/repositories/member-team-repository'
import type {
  IEditMemberUseCase,
  TEditMemberUseCaseRequest,
  TEditMemberUseCaseResponse,
} from '@DOMTypes/application/use-cases/member/edit-member'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { MemberTeam } from '_DOMEnt/entities/member-team'
import { MemberTeamList } from '_DOMEnt/entities/member-team-list'
import { Role } from '_DOMEnt/entities/value-objects'

export class EditMemberUseCase implements IEditMemberUseCase {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberTeamRepository: MemberTeamRepository,
  ) {}

  async execute({
    memberId,
    name,
    email,
    teamsIds,
    companyId,
    avatarUrl,
    role: roleCode,
  }: TEditMemberUseCaseRequest): Promise<TEditMemberUseCaseResponse> {
    const member = await this.memberRepository.findById(memberId)
    if (!member) return left(new ResourceNotFoundError())

    const role = Role.create(roleCode)
    if (!role.code) return left(new InvalidTypeError())

    const teams = await this.memberTeamRepository.findManyByMemberId(memberId)
    const memberTeamList = new MemberTeamList(teams)

    memberTeamList.update(
      teamsIds.map((teamId) => {
        return MemberTeam.create({
          memberId: member.id,
          teamId: new UniqueEntityID(teamId),
        })
      }),
    )

    member.role = role
    member.name = name
    member.email = email
    member.teams = memberTeamList
    member.avatar.url = avatarUrl
    member.company = new UniqueEntityID(companyId)

    await this.memberRepository.save(member)

    return right({ member })
  }
}
