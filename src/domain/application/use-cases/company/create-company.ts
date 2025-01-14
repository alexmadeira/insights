import type {
  ICreateCompanyUseCase,
  TCreateCompanyUseCaseRequest,
  TCreateCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/create-company'
import type { CompanyRepository } from '_DOMApp/repositories/company-repository'

import { right } from '_COR/either'
import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatarList } from '_DOMEnt/entities/company-avatar-list'
import { CompanyMemberList } from '_DOMEnt/entities/company-member-list'
import { CompanyProfileList } from '_DOMEnt/entities/company-profile-list'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'

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
