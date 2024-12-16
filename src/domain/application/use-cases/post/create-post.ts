import type { IPostRepository } from '@DOMTypes/application/repositories/post-repository'
import type {
  ICreatePostUseCase,
  TCreatePostUseCaseRequest,
  TCreatePostUseCaseResponse,
} from '@DOMTypes/application/use-cases/post/create-post'

import { right } from '_COR/either'
import { Post } from '_DOMEnt/entities/post'

export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute({ ...props }: TCreatePostUseCaseRequest): Promise<TCreatePostUseCaseResponse> {
    const post = Post.create({ ...props })

    await this.postRepository.create(post)

    return right({ post })
  }
}
