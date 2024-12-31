import type { Post } from '_DOMEnt/entities/post'

export abstract class PostRepository {
  abstract findById(id: string): Promise<Post | null>
  abstract create(avatar: Post): Promise<void>
  abstract save(avatar: Post): Promise<void>
  abstract delete(avatar: Post): Promise<void>
}
