import type { ReferenceRepository } from '_DOMApp/repositories/reference-repository'
import type {
  IEditReferenceUseCase,
  TEditReferenceUseCaseRequest,
  TEditReferenceUseCaseResponse,
} from '@DOMTypes/application/use-cases/reference/edit-reference'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { ReferenceStatus } from '_DOMEnt/entities/value-objects'

export class EditReferenceUseCase implements IEditReferenceUseCase {
  constructor(private readonly referenceRepository: ReferenceRepository) {}

  async execute({
    referenceId,
    name,
    statusCode,
    networkId,
  }: TEditReferenceUseCaseRequest): Promise<TEditReferenceUseCaseResponse> {
    const reference = await this.referenceRepository.findById(referenceId)

    if (!reference) return left(new ResourceNotFoundError())

    const status = new ReferenceStatus(statusCode)

    if (!status.code) return left(new InvalidTypeError())

    reference.name = name
    reference.status = status
    reference.network = new UniqueEntityID(networkId)

    await this.referenceRepository.save(reference)

    return right({ reference })
  }
}
