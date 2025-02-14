import type { MediaRepository } from '_DOMApp/repositories/media-repository'
import type {
  IEditMediaUseCase,
  TEditMediaUseCaseRequest,
  TEditMediaUseCaseResponse,
} from '@DOMTypes/application/use-cases/media/edit-media'

import { left, right } from '_COR/either'
import { MediaType } from '_DOMEnt/entities/value-objects'

import { InvalidTypeError } from '../_errors/invalid-type-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

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
