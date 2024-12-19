import type { IAvatarRepository } from '@DOMTypes/application/repositories/avatar-repository'
import type {
  ICreateAvatarUseCase,
  TCreateAvatarUseCaseRequest,
  TCreateAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/avatar/create-avatar'

import { right } from '_COR/either'
import { Avatar } from '_DOMEnt/entities/avatar'

export class CreateAvatarUseCase implements ICreateAvatarUseCase {
  constructor(private readonly avatarRepository: IAvatarRepository) {}

  async execute(props: TCreateAvatarUseCaseRequest): Promise<TCreateAvatarUseCaseResponse> {
    const avatar = Avatar.create(props)

    await this.avatarRepository.create(avatar)

    return right({ avatar })
  }
}
