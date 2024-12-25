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
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'

export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    teamsIds,
    membersIds,
    profilesIds,
    ...rest
  }: TCreateCompanyUseCaseRequest): Promise<TCreateCompanyUseCaseResponse> {
    const company = Company.create({
      profiles: profilesIds,
      avatar: CompanyAvatar.create({ name: rest.name }),
      ...rest,
    })

    company.teams = CompanyTeamList.create(company.id, teamsIds)
    company.members = CompanyMemberList.create(company.id, membersIds)

    company.avatar.companyId = company.id

    await this.companyRepository.create(company)

    return right({ company })
  }
}
