import type { AvatarRepository } from '_DOMApp/repositories/avatar-repository'
import type {
  IEditAvatarUseCase,
  TEditAvatarUseCaseRequest,
  TEditAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/avatar/edit-avatar'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMApp/use-cases/errors/resource-not-found-error'
import { ZEditAvatarUseCaseRequest } from '@DOMTypes/application/use-cases/avatar/edit-avatar'

export class EditAvatarUseCase implements IEditAvatarUseCase {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  async execute(raw: TEditAvatarUseCaseRequest): Promise<TEditAvatarUseCaseResponse> {
    const props = ZEditAvatarUseCaseRequest.parse(raw)
    const avatar = await this.avatarRepository.findById(props.avatarId)

    if (!avatar) return left(new ResourceNotFoundError())

    avatar.url = props.url
    avatar.name = props.name

    await this.avatarRepository.save(avatar)

    return right({ avatar })
  }
}
