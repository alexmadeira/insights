import type { NetworkPost } from '_DOMEnt/entities/network-post'

export interface NetworkPostRepository {
  create(networkPost: NetworkPost): Promise<NetworkPost>
  createMany(networkPost: NetworkPost[]): Promise<void>
  deleteMany(networkPost: NetworkPost[]): Promise<void>
  findManyByNetworkId(networkId: string): Promise<NetworkPost[]>
  deleteManyByNetworkId(networkId: string): Promise<void>
}
