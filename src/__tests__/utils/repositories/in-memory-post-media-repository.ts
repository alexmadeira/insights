import type { PostMediaRepository } from '_DOM/application/repositories/post-media-repository'
import type { PostMedia } from '_DOM/enterprise/entities/post-media'

export class InMemoryPostMediaRepository implements PostMediaRepository {
  public itens: PostMedia[] = []

  async create(postMedia: PostMedia) {
    this.itens.push(postMedia)

    return postMedia
  }

  async createMany(medias: PostMedia[]) {
    this.itens.push(...medias)
  }

  async deleteMany(medias: PostMedia[]) {
    this.itens = this.itens.filter((item) => !medias.some((media) => media.equals(item)))
  }

  async findManyByPostId(postId: string) {
    return this.itens.filter((item) => item.postId.toString() === postId)
  }

  async deleteManyByPostId(postId: string) {
    this.itens = this.itens.filter((item) => item.postId.toString() !== postId)
  }
}
