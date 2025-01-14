import type {
  IEditAvatarUseCase,
  TEditAvatarUseCaseRequest,
  TEditAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/avatar/edit-avatar'
import type { AvatarRepository } from '_DOMApp/repositories/avatar-repository'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'

export class EditAvatarUseCase implements IEditAvatarUseCase {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  async execute({ avatarId, name, isDefault, url }: TEditAvatarUseCaseRequest): Promise<TEditAvatarUseCaseResponse> {
    const avatar = await this.avatarRepository.findById(avatarId)

    if (!avatar) {
      return left(new ResourceNotFoundError())
    }

    avatar.url = url
    avatar.name = name
    avatar.isDefault = isDefault

    await this.avatarRepository.save(avatar)

    return right({ avatar })
  }
}
