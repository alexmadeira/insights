import type { PostRepository } from '_DOMApp/repositories/post-repository'
import type {
  IDeletePostUseCase,
  TDeletePostUseCaseRequest,
  TDeletePostUseCaseResponse,
} from '@DOMTypes/application/use-cases/post/delete-post'

import { left, right } from '_COR/either'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

export class DeletePostUseCase implements IDeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ postId }: TDeletePostUseCaseRequest): Promise<TDeletePostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    await this.postRepository.delete(post)

    return right(null)
  }
}
