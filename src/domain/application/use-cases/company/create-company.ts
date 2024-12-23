import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type {
  ICreateCompanyUseCase,
  TCreateCompanyUseCaseRequest,
  TCreateCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/create-company'

import { right } from '_COR/either'
import { Company } from '_DOMEnt/entities/company'
import { CompanyAvatar } from '_DOMEnt/entities/company-avatar'

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
      owner: ownerId,
      teams: teamsIds,
      members: membersIds,
      profiles: profilesIds,
      avatar: CompanyAvatar.create({ name: rest.name }),
      ...rest,
    })

    await this.companyRepository.create(company)

    return right({ company })
  }
}
