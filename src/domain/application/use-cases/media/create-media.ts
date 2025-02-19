import type { MediaRepository } from '_DOM/application/repositories/media-repository'
import type {
  ICreateMediaUseCase,
  TCreateMediaUseCaseRequest,
  TCreateMediaUseCaseResponse,
} from '@DOMTypes/application/use-cases/media/create-media'

import { left, right } from '_COR/either'
import { Media } from '_DOM/enterprise/entities/media'
import { MediaType } from '_DOM/enterprise/entities/value-objects'

import { InvalidTypeError } from '../_errors/invalid-type-error'

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
