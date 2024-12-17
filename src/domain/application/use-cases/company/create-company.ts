import type { ICompanyRepository } from '@DOMTypes/application/repositories/company-repository'
import type {
  ICreateCompanyUseCase,
  TCreateCompanyUseCaseRequest,
  TCreateCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/create-company'

import { right } from '_COR/either'
import { Company } from '_DOMEnt/entities/company'

export class CreateCompanyUseCase implements ICreateCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute({
    ownerId,
    teamsIds,
    membesIds,
    profilesIds,
    ...rest
  }: TCreateCompanyUseCaseRequest): Promise<TCreateCompanyUseCaseResponse> {
    const company = Company.create({
      owner: ownerId,
      teams: teamsIds,
      members: membesIds,
      profiles: profilesIds,
      ...rest,
    })

    await this.companyRepository.create(company)

    return right({ company })
  }
}
