import type { CompanyRepository } from '_DOMApp/repositories/company-repository'
import type {
  IDeleteCompanyUseCase,
  TDeleteCompanyUseCaseRequest,
  TDeleteCompanyUseCaseResponse,
} from '@DOMTypes/application/use-cases/company/delete-company'

import { left, right } from '_COR/either'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

export class DeleteCompanyUseCase implements IDeleteCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({ companyId }: TDeleteCompanyUseCaseRequest): Promise<TDeleteCompanyUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    await this.companyRepository.delete(company)

    return right(null)
  }
}
