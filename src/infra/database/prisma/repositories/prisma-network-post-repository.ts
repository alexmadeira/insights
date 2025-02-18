import type { NetworkPostRepository } from '_DOM/application/repositories/network-post-repository'
import type { NetworkPost } from '_DOM/enterprise/entities/network-post'

export class PrismaNetworkPostRepository implements NetworkPostRepository {
  public itens: NetworkPost[] = []

  async create(networkPost: NetworkPost) {
    this.itens.push(networkPost)
  }

  async createMany(posts: NetworkPost[]) {
    this.itens.push(...posts)
  }

  async deleteMany(postss: NetworkPost[]) {
    this.itens = this.itens.filter((item) => !postss.some((post) => post.equals(item)))
  }

  async findManyByNetworkId(networkId: string) {
    return this.itens.filter((item) => item.networkId.toString() === networkId)
  }

  async deleteManyByNetworkId(networkId: string) {
    this.itens = this.itens.filter((item) => item.networkId.toString() !== networkId)
  }
}
