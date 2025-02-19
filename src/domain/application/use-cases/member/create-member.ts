import type { MemberRepository } from '_DOM/application/repositories/member-repository'
import type {
  ICreateMemberUseCase,
  TCreateMemberUseCaseRequest,
  TCreateMemberUseCaseResponse,
} from '@DOMTypes/application/use-cases/member/create-member'

import { right } from '_COR/either'
import { Member } from '_DOM/enterprise/entities/member'
import { MemberAvatarList } from '_DOM/enterprise/entities/member-avatar-list'
import { MemberCompanyList } from '_DOM/enterprise/entities/member-company-list'
import { MemberTeamList } from '_DOM/enterprise/entities/member-team-list'

export class CreateMemberUseCase implements ICreateMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute({
    teamsIds,
    avatarsIds,
    companiesIds,
    ...props
  }: TCreateMemberUseCaseRequest): Promise<TCreateMemberUseCaseResponse> {
    const member = Member.create(props)

    member.teams = MemberTeamList.create(member.id, teamsIds)
    member.avatars = MemberAvatarList.create(member.id, avatarsIds)
    member.companies = MemberCompanyList.create(member.id, companiesIds)

    await this.memberRepository.create(member)

    return right({ member })
  }
}
