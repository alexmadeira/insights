import type { PostMediaRepository } from '_DOMApp/repositories/post-media-repository'
import type { PostRepository } from '_DOMApp/repositories/post-repository'
import type { Post } from '_DOMEnt/entities/post'

export class InMemoryPostRepository implements PostRepository {
  public itens: Post[] = []

  constructor(private readonly postMediaRepository: PostMediaRepository) {}

  async findById(postId: string) {
    const post = this.itens.find((item) => item.id.toString() === postId)

    if (!post) return null
    return post
  }

  async create(post: Post) {
    this.itens.push(post)
    this.postMediaRepository.createMany(post.medias.getItems())
  }

  async save(post: Post) {
    const itemIndex = this.itens.findIndex((item) => item.id === post.id)
    this.itens[itemIndex] = post
    this.postMediaRepository.createMany(post.medias.getNewItems())
    this.postMediaRepository.deleteMany(post.medias.getRemovedItems())
  }

  async delete(post: Post) {
    const itemIndex = this.itens.findIndex((item) => item.id === post.id)
    this.itens.splice(itemIndex, 1)
    this.postMediaRepository.deleteManyByPostId(post.id.toString())
  }
}
