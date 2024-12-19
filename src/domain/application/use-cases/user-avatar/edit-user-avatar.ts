import type { UserAvatarRepository } from '_DOMApp/repositories/user-avatar-repository'
import type {
  IEditUserAvatarUseCase,
  TEditUserAvatarUseCaseRequest,
  TEditUserAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/user-avatar/edit-user-avatar'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class EditUserAvatarUseCase implements IEditUserAvatarUseCase {
  constructor(private readonly avatarRepository: UserAvatarRepository) {}

  async execute({ avatarId, name, url }: TEditUserAvatarUseCaseRequest): Promise<TEditUserAvatarUseCaseResponse> {
    const userAvatar = await this.avatarRepository.findById(avatarId)

    if (!userAvatar) return left(new ResourceNotFoundError())

    userAvatar.url = url
    userAvatar.name = name

    await this.avatarRepository.save(userAvatar)

    return right({ userAvatar })
  }
}
