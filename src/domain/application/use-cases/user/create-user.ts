import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type {
  ICreateUserUseCase,
  TCreateUserUseCaseRequest,
  TCreateUserUseCaseResponse,
} from '@DOMTypes/application/use-cases/user/create-user'

import { left, right } from '_COR/either'
import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { InvalidTypeError } from '_DOMEnt/entities/_errors/invalid-type-error'
import { User } from '_DOMEnt/entities/user'
import { UserAvatar } from '_DOMEnt/entities/user-avatar'
import { UserTeamList } from '_DOMEnt/entities/user-team-list'
import { Role } from '_DOMEnt/entities/value-objects'

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    teamsIds,
    companyId,
    role: roleCode,
    ...rest
  }: TCreateUserUseCaseRequest): Promise<TCreateUserUseCaseResponse> {
    const role = Role.create(roleCode)
    if (!role.code) return left(new InvalidTypeError())

    const user = User.create({
      role,
      avatar: UserAvatar.create({ name: rest.name }),
      company: new UniqueEntityID(companyId),
      ...rest,
    })

    user.teams = UserTeamList.create(user.id, teamsIds)
    user.avatar.userId = user.id

    await this.userRepository.create(user)

    return right({ user })
  }
}
