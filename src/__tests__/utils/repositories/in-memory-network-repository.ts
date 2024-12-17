import type { INetworkRepository } from '@DOMTypes/application/repositories/network-repository'

import { Network } from '_DOMEnt/entities/network'

export class InMemoryNetworkRepository implements INetworkRepository {
  public itens: Network[] = []

  async findById(networkId: string) {
    const network = this.itens.find((item) => item.id.toString() === networkId)

    if (!network) return null
    return network
  }

  async create(network: Network) {
    this.itens.push(network)
  }

  async save(network: Network) {
    const itemIndex = this.itens.findIndex((item) => item.id === network.id)
    this.itens[itemIndex] = network
  }

  async delete(network: Network) {
    const itemIndex = this.itens.findIndex((item) => item.id === network.id)
    this.itens.splice(itemIndex, 1)
  }
}
