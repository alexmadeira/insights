import type { PostMedia } from '_DOM/enterprise/entities/post-media'

export interface PostMediaRepository {
  create(postMedia: PostMedia): Promise<PostMedia>
  createMany(postMedia: PostMedia[]): Promise<void>
  deleteMany(postMedia: PostMedia[]): Promise<void>
  findManyByPostId(postId: string): Promise<PostMedia[]>
  deleteManyByPostId(postId: string): Promise<void>
}
