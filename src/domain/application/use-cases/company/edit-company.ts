import type { CompanyMemberRepository } from '_DOMApp/repositories/company-member-repository'
import type { CompanyProfileRepository } from '_DOMApp/repositories/company-profile-repository'
import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type { CompanyTeamRepository } from '_DOMApp/repositories/company-team-repository'
import type {
  IEditCompanyUseCase,
  TEditCompanyUseCaseRequest,
  TEditCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/edit-company'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { CompanyMember } from '_DOMEnt/entities/company-member'
import { CompanyMemberList } from '_DOMEnt/entities/company-member-list'
import { CompanyProfile } from '_DOMEnt/entities/company-profile'
import { CompanyProfileList } from '_DOMEnt/entities/company-profile-list'
import { CompanyTeam } from '_DOMEnt/entities/company-team'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'

export class EditCompanyUseCase implements IEditCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyTeamRepository: CompanyTeamRepository,
    private readonly companyMemberRepository: CompanyMemberRepository,
    private readonly companyProfileRepository: CompanyProfileRepository,
  ) {}

  async execute({
    companyId,
    name,
    avatarUrl,
    teamsIds,
    membersIds,
    profilesIds,
  }: TEditCompanyUseCaseRequest): Promise<TEditCompanyUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)
    if (!company) return left(new ResourceNotFoundError())

    const teams = await this.companyTeamRepository.findManyByCompanyId(companyId)
    const members = await this.companyMemberRepository.findManyByCompanyId(companyId)
    const profiles = await this.companyProfileRepository.findManyByCompanyId(companyId)

    const companyTeamList = new CompanyTeamList(teams)
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
    companyMemberList.update(
      membersIds.map((memberId) =>
        CompanyMember.create({
          companyId: company.id,
          memberId: new UniqueEntityID(memberId),
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

    company.name = name
    company.teams = companyTeamList
    company.members = companyMemberList
    company.profiles = companyProfileList

    company.avatar.url = avatarUrl

    await this.companyRepository.save(company)

    return right({ company })
  }
}
