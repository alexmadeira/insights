import type { PostRepository } from '_DOMApp/repositories/post-repository'
import type {
  ICreatePostUseCase,
  TCreatePostUseCaseRequest,
  TCreatePostUseCaseResponse,
} from '@DOMTypes/application/use-cases/post/create-post'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { Post } from '_DOMEnt/entities/post'
import { PostMediaList } from '_DOMEnt/entities/post-media-list'
import { PostStatus } from '_DOMEnt/entities/value-objects/post-status'

export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({
    mediasIds,
    networkId,
    statusCode,
    ...props
  }: TCreatePostUseCaseRequest): Promise<TCreatePostUseCaseResponse> {
    const status = new PostStatus(statusCode)
    if (!status.code) return left(new InvalidTypeError())

    const post = Post.create({
      ...props,
      status,
      network: new UniqueEntityID(networkId),
    })

    post.medias = PostMediaList.create(post.id, mediasIds)

    await this.postRepository.create(post)

    return right({ post })
  }
}
