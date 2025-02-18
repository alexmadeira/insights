import type { MemberAvatarRepository } from '_DOM/application/repositories/member-avatar-repository'
import type { MemberCompanyRepository } from '_DOM/application/repositories/member-company-repository'
import type { MemberRepository } from '_DOM/application/repositories/member-repository'
import type { MemberTeamRepository } from '_DOM/application/repositories/member-team-repository'
import type { Member } from '_DOM/enterprise/entities/member'

export class InMemoryMemberRepository implements MemberRepository {
  public itens: Member[] = []

  constructor(
    private readonly memberAvatarRepository: MemberAvatarRepository,
    private readonly memberTeamRepository: MemberTeamRepository,
    private readonly memberCompanyRepository: MemberCompanyRepository,
  ) {}

  async findById(memberId: string) {
    const member = this.itens.find((item) => item.id.toString() === memberId)

    if (!member) return null
    return member
  }

  async create(member: Member) {
    this.itens.push(member)

    this.memberTeamRepository.createMany(member.teams.getItems())
    this.memberAvatarRepository.createMany(member.avatars.getItems())
    this.memberCompanyRepository.createMany(member.companies.getItems())

    return member
  }

  async save(member: Member) {
    const itemIndex = this.itens.findIndex((item) => item.id === member.id)
    this.itens[itemIndex] = member

    this.memberTeamRepository.createMany(member.teams.getNewItems())
    this.memberTeamRepository.deleteMany(member.teams.getRemovedItems())

    this.memberAvatarRepository.createMany(member.avatars.getNewItems())
    this.memberAvatarRepository.deleteMany(member.avatars.getRemovedItems())

    this.memberCompanyRepository.createMany(member.companies.getNewItems())
    this.memberCompanyRepository.deleteMany(member.companies.getRemovedItems())

    return member
  }

  async delete(member: Member) {
    const itemIndex = this.itens.findIndex((item) => item.id === member.id)
    this.itens.splice(itemIndex, 1)

    this.memberTeamRepository.deleteManyByMemberId(member.id.toString())
    this.memberAvatarRepository.deleteManyByMemberId(member.id.toString())
    this.memberCompanyRepository.deleteManyByMemberId(member.id.toString())
  }
}
