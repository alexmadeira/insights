import type { UserAvatarRepository } from '_DOMApp/repositories/user-avatar-repository'
import type {
  IDeleteUserAvatarUseCase,
  TDeleteUserAvatarUseCaseRequest,
  TDeleteUserAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/user-avatar/delete-user-avatar'

import { left, right } from '_COR/either'
import { ResourceNotFoundError } from '_DOMEnt/entities/_errors/resource-not-found-error'

export class DeleteUserAvatarUseCase implements IDeleteUserAvatarUseCase {
  constructor(private readonly avatarRepository: UserAvatarRepository) {}

  async execute({ avatarId }: TDeleteUserAvatarUseCaseRequest): Promise<TDeleteUserAvatarUseCaseResponse> {
    const avatar = await this.avatarRepository.findById(avatarId)

    if (!avatar) {
      return left(new ResourceNotFoundError())
    }

    await this.avatarRepository.delete(avatar)

    return right(null)
  }
}
