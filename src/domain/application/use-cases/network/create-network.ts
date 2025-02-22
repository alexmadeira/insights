import type { NetworkRepository } from '_DOM/application/repositories/network-repository'
import type {
  ICreateNetworkUseCase,
  TCreateNetworkUseCaseRequest,
  TCreateNetworkUseCaseResponse,
} from '@DOMTypes/application/use-cases/network/create-network'

import { left, right } from '_COR/either'
import { Network } from '_DOM/enterprise/entities/network'
import { NetworkPostList } from '_DOM/enterprise/entities/network-post-list'
import { NetworkType } from '_DOM/enterprise/entities/value-objects'

import { InvalidTypeError } from '../_errors/invalid-type-error'

export class CreateNetworkUseCase implements ICreateNetworkUseCase {
  constructor(private readonly networkRepository: NetworkRepository) {}

  async execute({
    typeCode,
    postsIds,
    ...props
  }: TCreateNetworkUseCaseRequest): Promise<TCreateNetworkUseCaseResponse> {
    const type = new NetworkType(typeCode)
    if (!type.code) return left(new InvalidTypeError(typeCode))

    const network = Network.create({
      ...props,
      type,
    })

    network.posts = NetworkPostList.create(network.id, postsIds)

    await this.networkRepository.create(network)

    return right({ network })
  }
}
