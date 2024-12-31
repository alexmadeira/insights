import type { PostMedia } from '_DOMEnt/entities/post-media'

export abstract class PostMediaRepository {
  abstract createMany(medias: PostMedia[]): Promise<void>
  abstract deleteMany(medias: PostMedia[]): Promise<void>
  abstract findManyByPostId(postId: string): Promise<PostMedia[]>
  abstract deleteManyByPostId(postId: string): Promise<void>
}
