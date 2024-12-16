import type { IReferenceRepository } from '@DOMTypes/application/repositories/reference-repository'
import type {
  ICreateReferenceUseCase,
  TCreateReferenceUseCaseRequest,
  TCreateReferenceUseCaseResponse,
} from '@DOMTypes/application/use-cases/reference/create-reference'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { Reference } from '_DOMEnt/entities/reference'
import { ReferenceStatus } from '_DOMEnt/entities/value-objects/reference-status'

export class CreateReferenceUseCase implements ICreateReferenceUseCase {
  constructor(private readonly referenceRepository: IReferenceRepository) {}

  async execute({ status, ...rest }: TCreateReferenceUseCaseRequest): Promise<TCreateReferenceUseCaseResponse> {
    const referenceStatus = ReferenceStatus.create(status ?? 'active')

    if (!referenceStatus.code) {
      return left(new InvalidTypeError())
    }

    const reference = Reference.create({
      status: referenceStatus,
      ...rest,
    })

    await this.referenceRepository.create(reference)

    return right({ reference })
  }
}
