import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type {
  ICreateCompanyUseCase,
  TCreateCompanyUseCaseRequest,
  TCreateCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/create-company'

import { right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatar } from '_DOMEnt/entities/company-avatar'
import { CompanyTeamList } from '_DOMEnt/entities/company-team-list'

export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    ownerId,
    teamsIds,
    membersIds,
    profilesIds,
    ...rest
  }: TCreateCompanyUseCaseRequest): Promise<TCreateCompanyUseCaseResponse> {
    const company = Company.create({
      members: membersIds,
      profiles: profilesIds,
      owner: new UniqueEntityID(ownerId),
      avatar: CompanyAvatar.create({ name: rest.name }),
      ...rest,
    })

    company.teams = CompanyTeamList.create(company.id, teamsIds)
    company.avatar.companyId = company.id

    await this.companyRepository.create(company)

    return right({ company })
  }
}
