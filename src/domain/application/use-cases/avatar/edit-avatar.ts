import type { IAvatarRepository } from '@DOMTypes/application/repositories/avatar-repository'
import type {
  IEditAvatarUseCase,
  TEditAvatarUseCaseRequest,
  TEditAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/avatar/edit-avatar'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class EditAvatarUseCase implements IEditAvatarUseCase {
  constructor(private readonly avatarRepository: IAvatarRepository) {}

  async execute({ avatarId, name, url }: TEditAvatarUseCaseRequest): Promise<TEditAvatarUseCaseResponse> {
    const avatar = await this.avatarRepository.findById(avatarId)

    if (!avatar) return left(new ResourceNotFoundError())

    avatar.url = url
    avatar.name = name

    await this.avatarRepository.save(avatar)

    return right({ avatar })
  }
}
