import type { CompanyRepository } from '_DOM/application/repositories/company-repository'
import type {
  ICreateCompanyUseCase,
  TCreateCompanyUseCaseRequest,
  TCreateCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/create-company'

import { right } from '_COR/either'
import { Company } from '_DOM/enterprise/entities/company'
import { CompanyAvatarList } from '_DOM/enterprise/entities/company-avatar-list'
import { CompanyMemberList } from '_DOM/enterprise/entities/company-member-list'
import { CompanyProfileList } from '_DOM/enterprise/entities/company-profile-list'
import { CompanyTeamList } from '_DOM/enterprise/entities/company-team-list'

export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    teamsIds,
    avatarsIds,
    profilesIds,
    membersRoles,
    ...props
  }: TCreateCompanyUseCaseRequest): Promise<TCreateCompanyUseCaseResponse> {
    const company = Company.create(props)

    company.teams = CompanyTeamList.create(company.id, teamsIds)
    company.avatars = CompanyAvatarList.create(company.id, avatarsIds)
    company.members = CompanyMemberList.create(company.id, membersRoles)
    company.profiles = CompanyProfileList.create(company.id, profilesIds)

    await this.companyRepository.create(company)

    return right({ company })
  }
}
