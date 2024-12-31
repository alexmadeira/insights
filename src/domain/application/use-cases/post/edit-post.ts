import type { PostMediaRepository } from '_DOMApp/repositories/post-media-repository'
import type { PostRepository } from '_DOMApp/repositories/post-repository'
import type {
  IEditPostUseCase,
  TEditPostUseCaseRequest,
  TEditPostUseCaseResponse,
} from '@DOMTypes/application/use-cases/post/edit-post'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'
import { PostMedia } from '_DOMEnt/entities/post-media'
import { PostMediaList } from '_DOMEnt/entities/post-media-list'
import { PostStatus } from '_DOMEnt/entities/value-objects/post-status'

export class EditPostUseCase implements IEditPostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postMediaRepository: PostMediaRepository,
  ) {}

  async execute({
    postId,
    cover,
    title,
    likes,
    deslikes,
    comments,
    mediasIds,
    statusCode,
    description,
    scheduledDate,
  }: TEditPostUseCaseRequest): Promise<TEditPostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)
    if (!post) return left(new ResourceNotFoundError())

    const status = new PostStatus(statusCode)
    if (!status.code) return left(new InvalidTypeError())

    const medias = await this.postMediaRepository.findManyByPostId(postId)

    const postMediaList = new PostMediaList(medias)

    postMediaList.update(
      mediasIds.map((mediaId) =>
        PostMedia.create({
          postId: post.id,
          mediaId: new UniqueEntityID(mediaId),
        }),
      ),
    )

    post.title = title
    post.likes = likes
    post.cover = cover
    post.status = status
    post.deslikes = deslikes
    post.comments = comments
    post.medias = postMediaList
    post.description = description
    post.scheduledDate = scheduledDate ?? new Date()

    await this.postRepository.save(post)

    return right({ post })
  }
}
