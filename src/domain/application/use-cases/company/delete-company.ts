import type { ICompanyRepository } from '@DOMTypes/application/repositories/company-repository'
import type {
  IDeleteCompanyUseCase,
  TDeleteCompanyUseCaseRequest,
  TDeleteCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/delete-company'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class DeleteCompanyUseCase implements IDeleteCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute({ companyId }: TDeleteCompanyUseCaseRequest): Promise<TDeleteCompanyUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    await this.companyRepository.delete(company)

    return right(null)
  }
}
