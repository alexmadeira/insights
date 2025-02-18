import type { ReferenceRepository } from '_DOM/application/repositories/reference-repository'
import type {
  ICreateReferenceUseCase,
  TCreateReferenceUseCaseRequest,
  TCreateReferenceUseCaseResponse,
} from '@DOMTypes/application/use-cases/reference/create-reference'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Reference } from '_DOM/enterprise/entities/reference'
import { ReferenceStatus, Slug } from '_DOM/enterprise/entities/value-objects'

import { InvalidReferenceStatusError } from '../_errors/invalid-reference-status-error'

export class CreateReferenceUseCase implements ICreateReferenceUseCase {
  constructor(private readonly referenceRepository: ReferenceRepository) {}

  async execute({
    name,
    statusCode = 'active',
    networkId,
    ...rest
  }: TCreateReferenceUseCaseRequest): Promise<TCreateReferenceUseCaseResponse> {
    const status = new ReferenceStatus(statusCode)

    if (!status.code) return left(new InvalidReferenceStatusError(statusCode))

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
