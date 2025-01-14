import type {
  IDeleteReferenceUseCase,
  TDeleteReferenceUseCaseRequest,
  TDeleteReferenceUseCaseResponse,
} from '@DOMTypes/application/use-cases/reference/delete-reference'
import type { ReferenceRepository } from '_DOMApp/repositories/reference-repository'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'

export class DeleteReferenceUseCase implements IDeleteReferenceUseCase {
  constructor(private readonly referenceRepository: ReferenceRepository) {}

  async execute({ referenceId }: TDeleteReferenceUseCaseRequest): Promise<TDeleteReferenceUseCaseResponse> {
    const reference = await this.referenceRepository.findById(referenceId)

    if (!reference) return left(new ResourceNotFoundError())

    await this.referenceRepository.delete(reference)

    return right(null)
  }
}
