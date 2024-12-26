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
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { MemberCompany } from '_DOMEnt/entities/member-company'
import { MemberCompanyList } from '_DOMEnt/entities/member-company-list'
import { MemberTeam } from '_DOMEnt/entities/member-team'
import { MemberTeamList } from '_DOMEnt/entities/member-team-list'

export class EditMemberUseCase implements IEditMemberUseCase {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberTeamRepository: MemberTeamRepository,
    private readonly memberCompanyRepository: MemberCompanyRepository,
  ) {}

  async execute({
    memberId,
    name,
    email,
    teamsIds,
    companiesIds,
    avatarUrl,
  }: TEditMemberUseCaseRequest): Promise<TEditMemberUseCaseResponse> {
    const member = await this.memberRepository.findById(memberId)
    if (!member) return left(new ResourceNotFoundError())

    const teams = await this.memberTeamRepository.findManyByMemberId(memberId)
    const companies = await this.memberCompanyRepository.findManyByMemberId(memberId)

    const memberTeamList = new MemberTeamList(teams)
    const memberCompanyList = new MemberCompanyList(companies)

    memberTeamList.update(
      teamsIds.map((teamId) =>
        MemberTeam.create({
          memberId: member.id,
          teamId: new UniqueEntityID(teamId),
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
    member.avatar.url = avatarUrl

    member.teams = memberTeamList
    member.companies = memberCompanyList

    await this.memberRepository.save(member)

    return right({ member })
  }
}
