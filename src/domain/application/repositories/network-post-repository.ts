import type { NetworkPost } from '_DOMEnt/entities/network-post'

export interface NetworkPostRepository {
  createMany(posts: NetworkPost[]): Promise<void>
  deleteMany(posts: NetworkPost[]): Promise<void>
  findManyByNetworkId(networkId: string): Promise<NetworkPost[]>
  deleteManyByNetworkId(networkId: string): Promise<void>
}
