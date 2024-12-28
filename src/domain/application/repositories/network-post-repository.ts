import type { NetworkPost } from '_DOMEnt/entities/network-post'

export abstract class NetworkPostRepository {
  abstract createMany(posts: NetworkPost[]): Promise<void>
  abstract deleteMany(posts: NetworkPost[]): Promise<void>
  abstract findManyByNetworkId(networkId: string): Promise<NetworkPost[]>
  abstract deleteManyByNetworkId(networkId: string): Promise<void>
}
