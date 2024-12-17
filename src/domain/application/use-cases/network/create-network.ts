import type { INetworkRepository } from '@DOMTypes/application/repositories/network-repository'
import type {
  ICreateNetworkUseCase,
  TCreateNetworkUseCaseRequest,
  TCreateNetworkUseCaseResponse,
} from '@DOMTypes/application/use-cases/network/create-network'

import { right } from '_COR/either'
import { Network } from '_DOMEnt/entities/network'

export class CreateNetworkUseCase implements ICreateNetworkUseCase {
  constructor(private readonly networkRepository: INetworkRepository) {}

  async execute({ typeId, postsIds, ...rest }: TCreateNetworkUseCaseRequest): Promise<TCreateNetworkUseCaseResponse> {
    const network = Network.create({
      type: typeId,
      posts: postsIds,
      ...rest,
    })

    await this.networkRepository.create(network)

    return right({ network })
  }
}
