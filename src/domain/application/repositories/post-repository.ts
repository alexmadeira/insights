import type { Post } from '_DOMEnt/entities/post'

export interface PostRepository {
  findById(id: string): Promise<Post | null>
  create(avatar: Post): Promise<Post>
  save(avatar: Post): Promise<Post>
  delete(avatar: Post): Promise<void>
}
