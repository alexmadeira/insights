import type { NetworkRepository } from '_DOMApp/repositories/network-repository'
import type {
  ICreateNetworkUseCase,
  TCreateNetworkUseCaseRequest,
  TCreateNetworkUseCaseResponse,
} from '@DOMTypes/application/use-cases/network/create-network'

import { right } from '_COR/either'
import { Network } from '_DOMEnt/entities/network'
import { NetworkPostList } from '_DOMEnt/entities/network-post-list'

export class CreateNetworkUseCase implements ICreateNetworkUseCase {
  constructor(private readonly networkRepository: NetworkRepository) {}

  async execute({ typeId, postsIds, ...rest }: TCreateNetworkUseCaseRequest): Promise<TCreateNetworkUseCaseResponse> {
    const network = Network.create({
      type: typeId,
      ...rest,
    })

    network.posts = NetworkPostList.create(network.id, postsIds)

    await this.networkRepository.create(network)

    return right({ network })
  }
}
