import type { MemberCompanyRepository } from '_DOMApp/repositories/member-company-repository'
import type { MemberRepository } from '_DOMApp/repositories/member-repository'
import type { MemberTeamRepository } from '_DOMApp/repositories/member-team-repository'
import type {
  IEditMemberUseCase,
  TEditMemberUseCaseRequest,
  TEditMemberUseCaseResponse,
} from '@DOMTypes/application/use-cases/member/edit-member'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { MemberAvatarRepository } from '_DOMApp/repositories/member-avatar-repository'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { MemberAvatar } from '_DOMEnt/entities/member-avatar'
import { MemberAvatarList } from '_DOMEnt/entities/member-avatar-list'
import { MemberCompany } from '_DOMEnt/entities/member-company'
import { MemberCompanyList } from '_DOMEnt/entities/member-company-list'
import { MemberTeam } from '_DOMEnt/entities/member-team'
import { MemberTeamList } from '_DOMEnt/entities/member-team-list'

export class EditMemberUseCase implements IEditMemberUseCase {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberTeamRepository: MemberTeamRepository,
    private readonly memberAvatarRepository: MemberAvatarRepository,
    private readonly memberCompanyRepository: MemberCompanyRepository,
  ) {}

  async execute({
    memberId,
    name,
    email,
    teamsIds,
    avatarsIds,
    companiesIds,
  }: TEditMemberUseCaseRequest): Promise<TEditMemberUseCaseResponse> {
    const member = await this.memberRepository.findById(memberId)
    if (!member) return left(new ResourceNotFoundError())

    const teams = await this.memberTeamRepository.findManyByMemberId(memberId)
    const avatars = await this.memberAvatarRepository.findManyByMemberId(memberId)
    const companies = await this.memberCompanyRepository.findManyByMemberId(memberId)

    const memberTeamList = new MemberTeamList(teams)
    const memberAvatarList = new MemberAvatarList(avatars)
    const memberCompanyList = new MemberCompanyList(companies)

    memberTeamList.update(
      teamsIds.map((teamId) =>
        MemberTeam.create({
          memberId: member.id,
          teamId: new UniqueEntityID(teamId),
        }),
      ),
    )
    memberAvatarList.update(
      avatarsIds.map((avatarId) =>
        MemberAvatar.create({
          memberId: member.id,
          avatarId: new UniqueEntityID(avatarId),
        }),
      ),
    )
    memberCompanyList.update(
      companiesIds.map((companyId) =>
        MemberCompany.create({
          memberId: member.id,
          companyId: new UniqueEntityID(companyId),
        }),
      ),
    )

    member.name = name
    member.email = email

    member.teams = memberTeamList
    member.avatars = memberAvatarList
    member.companies = memberCompanyList

    await this.memberRepository.save(member)

    return right({ member })
  }
}
