import type { PostMedia } from '_DOMEnt/entities/post-media'

export interface PostMediaRepository {
  createMany(medias: PostMedia[]): Promise<void>
  deleteMany(medias: PostMedia[]): Promise<void>
  findManyByPostId(postId: string): Promise<PostMedia[]>
  deleteManyByPostId(postId: string): Promise<void>
}
