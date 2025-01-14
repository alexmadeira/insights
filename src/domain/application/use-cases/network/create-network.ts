import type {
  ICreateNetworkUseCase,
  TCreateNetworkUseCaseRequest,
  TCreateNetworkUseCaseResponse,
} from '@DOMTypes/application/use-cases/network/create-network'
import type { NetworkRepository } from '_DOMApp/repositories/network-repository'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMApp/use-cases/errors/invalid-type-error'
import { Network } from '_DOMEnt/entities/network'
import { NetworkPostList } from '_DOMEnt/entities/network-post-list'
import { NetworkType } from '_DOMEnt/entities/value-objects'

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
