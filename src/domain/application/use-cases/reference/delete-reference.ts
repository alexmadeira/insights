import type { IReferenceRepository } from '@DOMTypes/application/repositories/reference-repository'
import type {
  IDeleteReferenceUseCase,
  TDeleteReferenceUseCaseRequest,
  TDeleteReferenceUseCaseResponse,
} from '@DOMTypes/application/use-cases/reference/delete-reference'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class DeleteReferenceUseCase implements IDeleteReferenceUseCase {
  constructor(private readonly referenceRepository: IReferenceRepository) {}

  async execute({ referenceId }: TDeleteReferenceUseCaseRequest): Promise<TDeleteReferenceUseCaseResponse> {
    const reference = await this.referenceRepository.findById(referenceId)

    if (!reference) {
      return left(new ResourceNotFoundError())
    }

    await this.referenceRepository.delete(reference)

    return right(null)
  }
}
