import type {
  IDeleteMediaUseCase,
  TDeleteMediaUseCaseRequest,
  TDeleteMediaUseCaseResponse,
} from '@DOMTypes/application/use-cases/media/delete-media'
import type { MediaRepository } from '_DOMApp/repositories/media-repository'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'

export class DeleteMediaUseCase implements IDeleteMediaUseCase {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async execute({ mediaId }: TDeleteMediaUseCaseRequest): Promise<TDeleteMediaUseCaseResponse> {
    const media = await this.mediaRepository.findById(mediaId)
    if (!media) return left(new ResourceNotFoundError())

    await this.mediaRepository.delete(media)

    return right(null)
  }
}
