import type { ICompanyRepository } from '@DOMTypes/application/repositories/company-repository'
import type {
  IEditCompanyUseCase,
  TEditCompanyUseCaseRequest,
  TEditCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/edit-company'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class EditCompanyUseCase implements IEditCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute({
    companyId,
    name,
    ownerId,
    teamsIds,
    membersIds,
    profilesIds,
  }: TEditCompanyUseCaseRequest): Promise<TEditCompanyUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    company.name = name
    company.owner = ownerId
    company.teams = teamsIds
    company.members = membersIds
    company.profiles = profilesIds

    await this.companyRepository.save(company)

    return right({ company })
  }
}
