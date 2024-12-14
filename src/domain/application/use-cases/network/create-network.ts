import type { INetworkRepository } from '@DOMTypes/application/repositories/network-repository'
import type {
  ICreateNetworkUseCase,
  TCreateNetworkUseCaseRequest,
  TCreateNetworkUseCaseResponse,
} from '@DOMTypes/application/use-cases/network/create-network'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { Network } from '_DOMEnt/entities/network'
import { NetworkStatus } from '_DOMEnt/entities/value-objects/network-status'

export class CreateNetworkUseCase implements ICreateNetworkUseCase {
  constructor(private readonly networkRepository: INetworkRepository) {}

  async execute({ status, ...rest }: TCreateNetworkUseCaseRequest): Promise<TCreateNetworkUseCaseResponse> {
    const networkStatus = new NetworkStatus(status ?? 'active')

    if (!networkStatus.code) {
      return left(new InvalidTypeError())
    }

    const network = Network.create({
      status: networkStatus,
      ...rest,
    })

    await this.networkRepository.create(network)

    return right({ network })
  }
}
