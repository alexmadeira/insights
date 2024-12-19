import type { NetworkRepository } from '_DOMApp/repositories/network-repository'
import type {
  IDeleteNetworkUseCase,
  TDeleteNetworkUseCaseRequest,
  TDeleteNetworkUseCaseResponse,
} from '@DOMTypes/application/use-cases/network/delete-network'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class DeleteNetworkUseCase implements IDeleteNetworkUseCase {
  constructor(private readonly networkRepository: NetworkRepository) {}

  async execute({ networkId }: TDeleteNetworkUseCaseRequest): Promise<TDeleteNetworkUseCaseResponse> {
    const network = await this.networkRepository.findById(networkId)

    if (!network) {
      return left(new ResourceNotFoundError())
    }

    await this.networkRepository.delete(network)

    return right(null)
  }
}
