import type { AvatarRepository } from '_DOM/application/repositories/avatar-repository'
import type {
  IDeleteAvatarUseCase,
  TDeleteAvatarUseCaseRequest,
  TDeleteAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/avatar/delete-avatar'

import { left, right } from '_COR/either'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

export class DeleteAvatarUseCase implements IDeleteAvatarUseCase {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  async execute({ avatarId }: TDeleteAvatarUseCaseRequest): Promise<TDeleteAvatarUseCaseResponse> {
    const avatar = await this.avatarRepository.findById(avatarId)

    if (!avatar) {
      return left(new ResourceNotFoundError())
    }

    await this.avatarRepository.delete(avatar)

    return right(null)
  }
}
