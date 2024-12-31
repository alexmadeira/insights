import type { ReferenceRepository } from '_DOMApp/repositories/reference-repository'
import type {
  ICreateReferenceUseCase,
  TCreateReferenceUseCaseRequest,
  TCreateReferenceUseCaseResponse,
} from '@DOMTypes/application/use-cases/reference/create-reference'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { Reference } from '_DOMEnt/entities/reference'
import { Slug } from '_DOMEnt/entities/value-objects'
import { ReferenceStatus } from '_DOMEnt/entities/value-objects/reference-status'

export class CreateReferenceUseCase implements ICreateReferenceUseCase {
  constructor(private readonly referenceRepository: ReferenceRepository) {}

  async execute({
    name,
    statusCode,
    networkId,
    ...rest
  }: TCreateReferenceUseCaseRequest): Promise<TCreateReferenceUseCaseResponse> {
    const status = new ReferenceStatus(statusCode ?? 'active')

    if (!status.code) return left(new InvalidTypeError())

    const reference = Reference.create({
      name,
      status,
      network: new UniqueEntityID(networkId),
      slug: Slug.createFromText(name),
      ...rest,
    })

    await this.referenceRepository.create(reference)

    return right({ reference })
  }
}
