import type { MediaRepository } from '_DOMApp/repositories/media-repository'
import type {
  ICreateMediaUseCase,
  TCreateMediaUseCaseRequest,
  TCreateMediaUseCaseResponse,
} from '@DOMTypes/application/use-cases/media/create-media'

import { left, right } from '_COR/either'
import { InvalidTypeError } from '_DOMApp/use-cases/errors/invalid-type-error'
import { Media } from '_DOMEnt/entities/media'
import { MediaType } from '_DOMEnt/entities/value-objects'

export class CreateMediaUseCase implements ICreateMediaUseCase {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async execute({ typeCode, ...props }: TCreateMediaUseCaseRequest): Promise<TCreateMediaUseCaseResponse> {
    const type = new MediaType(typeCode)
    if (!type.code) return left(new InvalidTypeError(typeCode))

    const media = Media.create({
      type,
      ...props,
    })

    await this.mediaRepository.create(media)

    return right({ media })
  }
}
