import type { MemberRepository } from '_DOMApp/repositories/member-repository'
import type {
  ICreateMemberUseCase,
  TCreateMemberUseCaseRequest,
  TCreateMemberUseCaseResponse,
} from '@DOMTypes/application/use-cases/member/create-member'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { Member } from '_DOMEnt/entities/member'
import { MemberAvatar } from '_DOMEnt/entities/member-avatar'
import { MemberCompanyList } from '_DOMEnt/entities/member-company-list'
import { MemberTeamList } from '_DOMEnt/entities/member-team-list'
import { Role } from '_DOMEnt/entities/value-objects'

export class CreateMemberUseCase implements ICreateMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute({
    teamsIds,
    companiesIds,
    role: roleCode,
    ...rest
  }: TCreateMemberUseCaseRequest): Promise<TCreateMemberUseCaseResponse> {
    const role = Role.create(roleCode)
    if (!role.code) return left(new InvalidTypeError())

    const member = Member.create({
      role,
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
