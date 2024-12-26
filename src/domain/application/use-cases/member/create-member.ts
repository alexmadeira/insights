import type { MemberRepository } from '_DOMApp/repositories/member-repository'
import type {
  ICreateMemberUseCase,
  TCreateMemberUseCaseRequest,
  TCreateMemberUseCaseResponse,
} from '@DOMTypes/application/use-cases/member/create-member'

import { right } from '_COR/either'
import { Member } from '_DOMEnt/entities/member'
import { MemberAvatar } from '_DOMEnt/entities/member-avatar'
import { MemberCompanyList } from '_DOMEnt/entities/member-company-list'
import { MemberTeamList } from '_DOMEnt/entities/member-team-list'

export class CreateMemberUseCase implements ICreateMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute({
    teamsIds,
    companiesIds,
    ...rest
  }: TCreateMemberUseCaseRequest): Promise<TCreateMemberUseCaseResponse> {
    const member = Member.create({
      avatar: MemberAvatar.create({ name: rest.name }),
      ...rest,
    })

    member.teams = MemberTeamList.create(member.id, teamsIds)
    member.companies = MemberCompanyList.create(member.id, companiesIds)

    member.avatar.memberId = member.id

    await this.memberRepository.create(member)

    return right({ member })
  }
}
