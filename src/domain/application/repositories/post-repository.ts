import type { Post } from '_DOMEnt/entities/post'

export interface PostRepository {
  findById(id: string): Promise<Post | null>
  create(avatar: Post): Promise<void>
  save(avatar: Post): Promise<void>
  delete(avatar: Post): Promise<void>
}
