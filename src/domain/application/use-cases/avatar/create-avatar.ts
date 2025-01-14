import type {
  ICreateAvatarUseCase,
  TCreateAvatarUseCaseRequest,
  TCreateAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/avatar/create-avatar'
import type { AvatarRepository } from '_DOMApp/repositories/avatar-repository'

import { right } from '_COR/either'
import { Avatar } from '_DOMEnt/entities/avatar'

export class CreateAvatarUseCase implements ICreateAvatarUseCase {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  async execute(props: TCreateAvatarUseCaseRequest): Promise<TCreateAvatarUseCaseResponse> {
    const avatar = Avatar.create(props)

    await this.avatarRepository.create(avatar)

    return right({ avatar })
  }
}
