import type { IReferenceRepository } from '@DOMTypes/application/repositories/reference-repository'
import type {
  ICreateReferenceUseCase,
  TCreateReferenceUseCaseRequest,
  TCreateReferenceUseCaseResponse,
} from '@DOMTypes/application/use-cases/reference/create-reference'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { Reference } from '_DOMEnt/entities/reference'
import { Slug } from '_DOMEnt/entities/value-objects'
import { ReferenceStatus } from '_DOMEnt/entities/value-objects/reference-status'

export class CreateReferenceUseCase implements ICreateReferenceUseCase {
  constructor(private readonly referenceRepository: IReferenceRepository) {}

  async execute({
    name,
    status: referenceStatus,
    networkId,
    ...rest
  }: TCreateReferenceUseCaseRequest): Promise<TCreateReferenceUseCaseResponse> {
    const status = ReferenceStatus.create(referenceStatus ?? 'active')

    if (!status.code) {
      return left(new InvalidTypeError())
    }

    const reference = Reference.create({
      name,
      status,
      network: networkId,
      slug: Slug.createFromText(name),
      ...rest,
    })

    await this.referenceRepository.create(reference)

    return right({ reference })
  }
}
