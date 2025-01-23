import type { AvatarRepository } from '_DOMApp/repositories/avatar-repository'
import type {
  ICreateAvatarUseCase,
  TCreateAvatarUseCaseRequest,
  TCreateAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/avatar/create-avatar'

import { right } from '_COR/either'
import { Avatar } from '_DOMEnt/entities/avatar'
import { ZCreateAvatarUseCaseRequest } from '@DOMTypes/application/use-cases/avatar/create-avatar'

export class CreateAvatarUseCase implements ICreateAvatarUseCase {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  async execute(raw: TCreateAvatarUseCaseRequest): Promise<TCreateAvatarUseCaseResponse> {
    const props = ZCreateAvatarUseCaseRequest.parse(raw)
    const avatar = Avatar.create(props)

    await this.avatarRepository.create(avatar)

    return right({ avatar })
  }
}
