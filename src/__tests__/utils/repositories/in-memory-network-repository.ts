import type { NetworkPostRepository } from '_DOM/application/repositories/network-post-repository'
import type { NetworkRepository } from '_DOM/application/repositories/network-repository'
import type { Network } from '_DOM/enterprise/entities/network'

export class InMemoryNetworkRepository implements NetworkRepository {
  public itens: Network[] = []

  constructor(private readonly networkPostRepository: NetworkPostRepository) {}

  async findById(networkId: string) {
    const network = this.itens.find((item) => item.id.toString() === networkId)

    if (!network) return null
    return network
  }

  async create(network: Network) {
    this.itens.push(network)

    this.networkPostRepository.createMany(network.posts.getItems())

    return network
  }

  async save(network: Network) {
    const itemIndex = this.itens.findIndex((item) => item.id === network.id)
    this.itens[itemIndex] = network

    this.networkPostRepository.createMany(network.posts.getNewItems())
    this.networkPostRepository.deleteMany(network.posts.getRemovedItems())

    return network
  }

  async delete(network: Network) {
    const itemIndex = this.itens.findIndex((item) => item.id === network.id)
    this.itens.splice(itemIndex, 1)

    this.networkPostRepository.deleteManyByNetworkId(network.id.toString())
  }
}
