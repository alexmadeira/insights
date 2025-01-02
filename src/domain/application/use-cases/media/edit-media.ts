import type { MediaRepository } from '_DOMApp/repositories/media-repository'
import type {
  IEditMediaUseCase,
  TEditMediaUseCaseRequest,
  TEditMediaUseCaseResponse,
} from '@DOMTypes/application/use-cases/media/edit-media'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMApp/use-cases/errors/invalid-type-error'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { MediaType } from '_DOMEnt/entities/value-objects'

export class EditMediaUseCase implements IEditMediaUseCase {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async execute({ mediaId, url, typeCode }: TEditMediaUseCaseRequest): Promise<TEditMediaUseCaseResponse> {
    const media = await this.mediaRepository.findById(mediaId)
    if (!media) return left(new ResourceNotFoundError())

    const type = new MediaType(typeCode)
    if (!type.code) return left(new InvalidTypeError(typeCode))

    media.url = url
    media.type = type

    await this.mediaRepository.save(media)

    return right({ media })
  }
}
