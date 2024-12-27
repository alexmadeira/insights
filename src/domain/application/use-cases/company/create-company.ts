import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type {
  ICreateCompanyUseCase,
  TCreateCompanyUseCaseRequest,
  TCreateCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/create-company'

import { right } from '_COR/either'
import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatar } from '_DOMEnt/entities/company-avatar'
import { CompanyMemberList } from '_DOMEnt/entities/company-member-list'
import { CompanyProfileList } from '_DOMEnt/entities/company-profile-list'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'

export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    teamsIds,
    membersRoles,
    profilesIds,
    ...rest
  }: TCreateCompanyUseCaseRequest): Promise<TCreateCompanyUseCaseResponse> {
    const company = Company.create({
      avatar: CompanyAvatar.create({ name: rest.name }),
      ...rest,
    })

    company.avatar.companyId = company.id

    company.teams = CompanyTeamList.create(company.id, teamsIds)
    company.profiles = CompanyProfileList.create(company.id, profilesIds)
    company.members = CompanyMemberList.create(company.id, membersRoles)

    await this.companyRepository.create(company)

    return right({ company })
  }
}
