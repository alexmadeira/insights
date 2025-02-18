import type { PostMediaRepository } from '_DOM/application/repositories/post-media-repository'
import type { PostRepository } from '_DOM/application/repositories/post-repository'
import type { Post } from '_DOM/enterprise/entities/post'

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

    return post
  }

  async save(post: Post) {
    const itemIndex = this.itens.findIndex((item) => item.id === post.id)
    this.itens[itemIndex] = post
    this.postMediaRepository.createMany(post.medias.getNewItems())
    this.postMediaRepository.deleteMany(post.medias.getRemovedItems())

    return post
  }

  async delete(post: Post) {
    const itemIndex = this.itens.findIndex((item) => item.id === post.id)
    this.itens.splice(itemIndex, 1)
    this.postMediaRepository.deleteManyByPostId(post.id.toString())
  }
}
