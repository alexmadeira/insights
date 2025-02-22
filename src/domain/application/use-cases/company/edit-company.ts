import type { CompanyAvatarRepository } from '_DOM/application/repositories/company-avatar-repository'
import type { CompanyMemberRepository } from '_DOM/application/repositories/company-member-repository'
import type { CompanyProfileRepository } from '_DOM/application/repositories/company-profile-repository'
import type { CompanyRepository } from '_DOM/application/repositories/company-repository'
import type { CompanyTeamRepository } from '_DOM/application/repositories/company-team-repository'
import type {
  IEditCompanyUseCase,
  TEditCompanyUseCaseRequest,
  TEditCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/edit-company'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { CompanyAvatar } from '_DOM/enterprise/entities/company-avatar'
import { CompanyAvatarList } from '_DOM/enterprise/entities/company-avatar-list'
import { CompanyMember } from '_DOM/enterprise/entities/company-member'
import { CompanyMemberList } from '_DOM/enterprise/entities/company-member-list'
import { CompanyProfile } from '_DOM/enterprise/entities/company-profile'
import { CompanyProfileList } from '_DOM/enterprise/entities/company-profile-list'
import { CompanyTeam } from '_DOM/enterprise/entities/company-team'
import { CompanyTeamList } from '_DOM/enterprise/entities/company-team-list'
import { MemberRole } from '_DOM/enterprise/entities/value-objects'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

export class EditCompanyUseCase implements IEditCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyTeamRepository: CompanyTeamRepository,
    private readonly companyAvatarRepository: CompanyAvatarRepository,
    private readonly companyMemberRepository: CompanyMemberRepository,
    private readonly companyProfileRepository: CompanyProfileRepository,
  ) {}

  async execute({
    companyId,
    name,
    teamsIds,
    avatarsIds,
    membersRoles,
    profilesIds,
  }: TEditCompanyUseCaseRequest): Promise<TEditCompanyUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)
    if (!company) return left(new ResourceNotFoundError())

    const teams = await this.companyTeamRepository.findManyByCompanyId(companyId)
    const members = await this.companyMemberRepository.findManyByCompanyId(companyId)
    const avatars = await this.companyAvatarRepository.findManyByCompanyId(companyId)
    const profiles = await this.companyProfileRepository.findManyByCompanyId(companyId)

    const companyTeamList = new CompanyTeamList(teams)
    const companyAvatarList = new CompanyAvatarList(avatars)
    const companyMemberList = new CompanyMemberList(members)
    const companyProfileList = new CompanyProfileList(profiles)

    companyTeamList.update(
      teamsIds.map((teamId) =>
        CompanyTeam.create({
          companyId: company.id,
          teamId: new UniqueEntityID(teamId),
        }),
      ),
    )
    companyAvatarList.update(
      avatarsIds.map((avatarId) =>
        CompanyAvatar.create({
          companyId: company.id,
          avatarId: new UniqueEntityID(avatarId),
        }),
      ),
    )
    companyProfileList.update(
      profilesIds.map((profileId) =>
        CompanyProfile.create({
          companyId: company.id,
          profileId: new UniqueEntityID(profileId),
        }),
      ),
    )

    companyMemberList.update(
      membersRoles.map((memberRole) =>
        CompanyMember.create({
          companyId: company.id,
          member: new MemberRole(...memberRole),
        }),
      ),
    )

    company.name = name
    company.teams = companyTeamList
    company.avatars = companyAvatarList
    company.members = companyMemberList
    company.profiles = companyProfileList

    await this.companyRepository.save(company)

    return right({ company })
  }
}
