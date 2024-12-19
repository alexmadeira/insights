import type { UserAvatarRepository } from '_DOMApp/repositories/user-avatar-repository'
import type {
  ICreateUserAvatarUseCase,
  TCreateUserAvatarUseCaseRequest,
  TCreateUserAvatarUseCaseResponse,
} from '@DOMTypes/application/use-cases/user-avatar/create-user-avatar'

import { right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { UserAvatar } from '_DOMEnt/entities/user-avatar'

export class CreateUserAvatarUseCase implements ICreateUserAvatarUseCase {
  constructor(private readonly userAvatarRepository: UserAvatarRepository) {}

  async execute(props: TCreateUserAvatarUseCaseRequest): Promise<TCreateUserAvatarUseCaseResponse> {
    const avatar = UserAvatar.create({
      ...props,
      userId: new UniqueEntityID(props.userId),
    })

    await this.userAvatarRepository.create(avatar)

    return right({ avatar })
  }
}
