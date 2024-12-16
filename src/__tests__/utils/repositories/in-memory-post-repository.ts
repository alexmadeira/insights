import type { IPostRepository } from '@DOMTypes/application/repositories/post-repository'

import { Post } from '_DOMEnt/entities/post'

export class InMemoryPostRepository implements IPostRepository {
  public itens: Post[] = []

  async findById(postId: string) {
    const post = this.itens.find((item) => item.id.toString() === postId)

    if (!post) return null
    return post
  }

  async create(post: Post) {
    this.itens.push(post)
  }

  async save(post: Post) {
    const itemIndex = this.itens.findIndex((item) => item.id === post.id)
    this.itens[itemIndex] = post
  }
}
